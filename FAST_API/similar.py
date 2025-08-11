import os
import json
import requests
import zipfile
import io
import xml.etree.ElementTree as ET
import pandas as pd
from openai import OpenAI
import os, zipfile, io, xml.etree.ElementTree as ET, pandas as pd
import dart_fss as dart
import re

# 🔑 API 키 설정 (환경변수 권장)
NAVER_CLIENT_ID = os.getenv("NAVER_CLIENT_ID", "YOUR_NAVER_ID")
NAVER_CLIENT_SECRET = os.getenv("NAVER_CLIENT_SECRET", "YOUR_NAVER_SECRET")
DART_API_KEY = os.getenv("DART_API_KEY", "YOUR_DART_KEY")
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY", "YOUR_OPENAI_KEY")
client = OpenAI(api_key=OPENAI_API_KEY)


# =========================
# 🧱 Top100 하드코딩 (예시 스냅샷)
#  - 필요 시 아래 목록을 여러분 조직 기준으로 100개 채우세요.
#  - 코드가 정확히 100개일 필요는 없지만, 충분히 많을수록 매칭 품질↑
# =========================
TOP100 = [
    ("005930","삼성전자"), ("000660","SK하이닉스"), ("373220","LG에너지솔루션"),
    ("207940","삼성바이오로직스"), ("005380","현대차"), ("000270","기아"),
    ("051910","LG화학"), ("068270","셀트리온"), ("006400","삼성SDI"),
    ("035420","NAVER"), ("035720","카카오"), ("028260","삼성물산"),
    ("066570","LG전자"), ("003550","LG"), ("005490","POSCO홀딩스"),
    ("012330","현대모비스"), ("051900","LG생활건강"), ("055550","신한지주"),
    ("105560","KB금융"), ("034730","SK"), ("259960","크래프톤"),
    ("096770","SK이노베이션"), ("010950","S-Oil"), ("003670","포스코케미칼"),
    ("011200","HMM"), ("000810","삼성화재"), ("086790","하나금융지주"),
    ("316140","우리금융지주"), ("086520","에코프로"), ("066970","엘앤에프"),
    ("011170","롯데케미칼"), ("010130","고려아연"), ("251270","넷마블"),
    ("035510","신세계"), ("034020","두산에너빌리티"), ("006800","미래에셋증권"),
    ("005940","NH투자증권"), ("326030","SK바이오팜"), ("018260","삼성에스디에스"),
    ("032830","삼성생명"), ("180640","한진칼"), ("003490","대한항공"),
    ("272210","한화시스템"), ("003490","대한항공"), ("047810","한국항공우주"),
    ("017670","SK텔레콤"), ("030200","KT"), ("035600","KG이니시스"),
    ("069620","대웅제약"), ("128940","한미약품"), ("000720","현대건설"),
    ("006360","GS건설"), ("161390","한국타이어앤테크놀로지"), ("033780","KT&G"),
    ("139480","이마트"), ("204320","만도"), ("267250","HD현대"),
    ("010620","HD현대일렉트릭"), ("009540","한국조선해양"), ("009150","삼성전기"),
    ("000990","DB하이텍"), ("021240","코웨이"), ("002790","아모레G"),
    ("090430","아모레퍼시픽"), ("028050","삼성엔지니어링"), ("024110","기업은행"),
    ("003410","쌍용C&E"), ("032640","LG유플러스"), ("090370","메타랩스"),
    ("096770","SK이노베이션"), ("003550","LG"), ("011780","금호석유화학"),
    ("017800","현대엘리베이터"), ("006650","대한유화"), ("011070","LG이노텍"),
    ("005930","삼성전자우"), ("093370","후성"), ("316140","우리금융지주"),
    # ⬆️ 예시: 실제로는 100개 채워 쓰세요.
]

# =========================
# ⚙️ 공통 유틸
# =========================
SPV_PAT = re.compile(r"(?:유동화|전문회사|특수목적|SPC|제\d+차|유한회사)$")  # 비캡처 그룹
HANGUL_BLOCK = re.compile(r"[가-힣]+")

def _top_news_tokens(news_titles, k=6):
    txt = " ".join(news_titles or [])
    toks = re.findall(r"[가-힣A-Za-z0-9]{2,}", txt)
    stop = {"관련","보도","기사","사업","회사","제공","출시","대표","계약","진출","경영","분기","실적"}
    freq = {}
    for t in toks:
        if t in stop: 
            continue
        freq[t] = freq.get(t, 0) + 1
    return [w for w,_ in sorted(freq.items(), key=lambda x: -x[1])[:k]]

def _parse_json_strict(text: str):
    m = re.search(r"```json\s*(.*?)\s*```", text, flags=re.S)
    payload = m.group(1) if m else text
    return json.loads(payload)

def _clamp_int(x, lo=0, hi=100):
    try:
        v = int(round(float(x)))
        return max(lo, min(hi, v))
    except Exception:
        return None

def brand_root(name: str, min_len: int = 2, max_len: int = 3) -> str:
    if not name:
        return ""
    m = HANGUL_BLOCK.search(name)
    if m:
        block = m.group(0)
        return block[:max_len] if len(block) >= max_len else block[:min_len]
    alnum = re.findall(r"[A-Za-z0-9]+", name)
    if alnum:
        return alnum[0][:max_len]
    return name[:min_len]

def exclude_same_group_candidates(cand_df: pd.DataFrame, base_name: str, base_holder: str = None) -> pd.DataFrame:
    """동일 계열/브랜드(회사명 시작 루트) 제거"""
    root = brand_root(base_name)
    out = cand_df.copy()
    if 'Name' in out.columns:
        name_col = 'Name'
    else:
        name_col = 'corp_name'
    if root:
        out = out[~out[name_col].str.contains(rf"^{re.escape(root)}", na=False)]
    if base_holder and base_holder != "없음":
        holder_root = brand_root(base_holder)
        if holder_root:
            out = out[~out[name_col].str.contains(rf"^{re.escape(holder_root)}", na=False)]
    return out

def _one_line_reason(profile, news_keys, product_hint=None, holder_hint=None):
    p_name = product_hint or "핵심 제품/브랜드"
    hold   = holder_hint or (("지주: " + profile.get("지주회사")) if profile.get("지주회사") and profile.get("지주회사")!="없음" else "동일 업종")
    news   = f"\"{news_keys[0]}\"" if news_keys else "추정: 해외 유통"
    return f"{p_name} 포지셔닝 유사, {hold} 근거, 뉴스 인용 {news}"

# =========================
# 🗂 DART corpCode (캐시)
# =========================
def load_corp_list(api_key, cache_path="corpCode.xml") -> pd.DataFrame:
    if os.path.exists(cache_path):
        tree = ET.parse(cache_path)
        root = tree.getroot()
    else:
        url = f"https://opendart.fss.or.kr/api/corpCode.xml?crtfc_key={api_key}"
        res = requests.get(url)
        if res.status_code != 200 or res.content[:2] != b'PK':
            raise Exception("❌ corpCode.zip 다운로드 실패")
        z = zipfile.ZipFile(io.BytesIO(res.content))
        xml_content = z.read(z.namelist()[0])
        with open(cache_path, "wb") as f:
            f.write(xml_content)
        root = ET.fromstring(xml_content)
    return pd.DataFrame([{
        "corp_code": item.findtext('corp_code'),
        "corp_name": item.findtext('corp_name'),
        "stock_code": item.findtext('stock_code')
    } for item in root.findall('list')])

# =========================
# 🔎 기준기업 검색 & 개황/뉴스
# =========================
def clean_name(name: str) -> str:
    return re.sub(r'\(주\)|주식회사', '', str(name)).strip()

def find_corp_by_keyword(df: pd.DataFrame, keyword: str) -> pd.DataFrame:
    kw = clean_name(keyword)
    return df[df["corp_name"].str.contains(kw, case=False, na=False)]

def pick_best_match(matches_df: pd.DataFrame, keyword: str) -> pd.Series:
    kw = clean_name(keyword)
    cand = matches_df.copy()
    cand["__score__"] = 0
    cand.loc[cand["corp_name"].str.startswith(kw, na=False), "__score__"] += 3
    cand.loc[cand["stock_code"].notnull(), "__score__"] += 2
    cand.loc[~cand["corp_name"].str.contains(SPV_PAT, na=False), "__score__"] += 2
    cand.loc[cand["corp_name"].str.contains(kw, case=False, na=False), "__score__"] += 1
    cand = cand.sort_values(["__score__", "corp_name"], ascending=[False, True])
    return cand.iloc[0]

def collect_company_profile(corp_code: str, api_key: str) -> dict:
    url = "https://opendart.fss.or.kr/api/company.json"
    params = {"crtfc_key": api_key, "corp_code": corp_code}
    res = requests.get(url, params=params).json()
    if res.get("status") != "000":
        return {}
    return {
        "기업명": res.get("corp_name"),
        "대표자명": res.get("ceo_nm"),
        "업종": res.get("induty_code"),
        "상장여부": "상장" if res.get("stock_code") else "비상장",
        "설립일자": res.get("est_dt"),
        "주소": res.get("adres"),
        "지주회사": res.get("hm_ownr_corp_nm") or "없음",
        "corp_code": corp_code
    }

def fetch_news_titles(keyword: str, max_count: int = 7) -> list:
    url = "https://openapi.naver.com/v1/search/news.json"
    headers = {
        "X-Naver-Client-Id": NAVER_CLIENT_ID,
        "X-Naver-Client-Secret": NAVER_CLIENT_SECRET
    }
    params = {"query": keyword, "display": max_count, "sort": "date"}
    res = requests.get(url, headers=headers, params=params)
    if res.status_code != 200:
        return []
    items = res.json().get("items", [])
    return [item.get("title","") for item in items]

# =========================
# 🧾 Top100 → DataFrame
# =========================
def get_top100_dataframe() -> pd.DataFrame:
    df = pd.DataFrame(TOP100, columns=["Symbol","Name"])
    # 중복 제거/정렬(안전)
    df = df.drop_duplicates(subset=["Symbol","Name"]).reset_index(drop=True)
    return df

# =========================
# 🤖 GPT: Top100 중 유사 2개 + 점수 + 한 줄 이유
# =========================
def suggest_similar_from_top100(base_profile: dict, base_news_titles: list, top100_df: pd.DataFrame):
    news_keys = _top_news_tokens(base_news_titles, k=6)
    candidates = [{"name": n} for n in top100_df["Name"].tolist()]

    base_root = brand_root(base_profile.get("기업명",""))
    holder = base_profile.get("지주회사","")

    prompt = f"""
당신은 한국 기업 재무 분석가입니다.
기준 기업 개요와 뉴스 핵심어, 그리고 상장사 후보 목록이 주어집니다.
후보 중 기준 기업과 가장 유사한 상장사 2개를 고르세요.

[기준 기업 개요(JSON)]
{json.dumps(base_profile, ensure_ascii=False)}

[뉴스 핵심어]
{news_keys}

[후보]
{json.dumps(candidates, ensure_ascii=False)}

제약:
- "similarity"는 0~100 정수.
- "reason"은 자연스러운 한 문장(12~30자 권장, 최대 25단어), 마침표로 끝맺기.
- 반드시 포함: (1) 구체 명사(브랜드·제품·채널·고객군 중 하나), (2) 개황 근거(업종·지주회사·지역 등), (3) [뉴스 핵심어] 1개를 큰따옴표로 인용.
- 금지: '키워드 포함', '유사한 업종' 같은 포괄적/메타 표현.
- 동일 계열/동일 브랜드 루트 금지: 기업명이 "{base_root}"로 시작하거나 지주 "{holder}"와 동일 계열로 추정되는 후보는 제외.

출력(반드시 이 JSON 배열만, 코드펜스 금지):
[
  {{ "name": "기업A", "similarity": 87, "reason": "자연스러운 한 문장" }},
  {{ "name": "기업B", "similarity": 81, "reason": "자연스러운 한 문장" }}
]
"""
    resp = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role":"user","content":prompt}],
        temperature=0
    )
    try:
        data = _parse_json_strict(resp.choices[0].message.content)
    except Exception:
        data = []

    # 검증/보정
    cand_names = set(top100_df["Name"].tolist())
    out = []
    if isinstance(data, list):
        for it in data:
            nm = str(it.get("name","")).strip()
            if nm in cand_names:
                out.append({
                    "name": nm,
                    "similarity": _clamp_int(it.get("similarity"), 0, 100) or 68,
                    "reason": (it.get("reason") or _one_line_reason(base_profile, news_keys)).strip()
                })

    # 부족하면 상위 후보로 채우기
    need = 2 - len(out)
    if need > 0:
        for nm in top100_df["Name"].tolist():
            if nm in {o["name"] for o in out}:
                continue
            out.append({
                "name": nm,
                "similarity": 66 if len(out)==1 else 64,
                "reason": _one_line_reason(base_profile, news_keys)
            })
            if len(out) >= 2: break
    return out[:2]

# =========================
# 🚀 파이프라인
# =========================
def run_similarity_against_top100_hardcoded(keyword: str, candidate_limit: int = 30):
    # 1) Top100 (하드코딩)
    top100 = get_top100_dataframe()

    # 2) DART corp list → 기준 기업 매핑
    corp_df = load_corp_list(DART_API_KEY)
    matches = find_corp_by_keyword(corp_df, keyword)
    if matches.empty:
        raise ValueError("❌ 해당 키워드를 포함한 기업을 DART에서 찾을 수 없습니다.")
    matches = matches[~matches["corp_name"].str.contains(SPV_PAT, na=False)]  # SPV 제거
    # 상장 우선
    if matches["stock_code"].notnull().any():
        base_row = matches[matches["stock_code"].notnull()].iloc[0]
    else:
        base_row = matches.iloc[0]

    # 3) 기준기업 개황 + 뉴스
    base_profile = collect_company_profile(base_row["corp_code"], DART_API_KEY) or {
        "기업명": base_row["corp_name"],
        "지주회사": "없음",
        "corp_code": base_row["corp_code"]
    }
    base_news = fetch_news_titles(base_profile["기업명"], max_count=7)

    # 4) 후보 전처리: SPV/동일계열 제거 + 상위 N
    cand_df = top100.copy()
    cand_df = cand_df[~cand_df["Name"].str.contains(SPV_PAT, na=False)]
    cand_df = exclude_same_group_candidates(cand_df, base_name=base_profile.get("기업명",""), base_holder=base_profile.get("지주회사", None))
    cand_df = cand_df.head(candidate_limit)  # 필요 시 30 등으로 조정

    # 5) GPT 유사 2개 + 이유
    similar = suggest_similar_from_top100(base_profile, base_news, cand_df)

    return {
        "기준기업": base_profile.get("기업명", keyword),
        "Top100_사용": True,
        "후보_검토개수": len(cand_df),
        "유사상장사": similar
    }

# =========================
# 🖥️ CLI
# =========================
if __name__ == "__main__":
    keyword = input("🔍 기준 기업명: ").strip()
    result = run_similarity_against_top100_hardcoded(keyword, candidate_limit=30)
    print(json.dumps(result, ensure_ascii=False, indent=2))


