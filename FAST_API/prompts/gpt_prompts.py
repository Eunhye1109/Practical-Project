from utils.config import CLIENT
import json, re
from datetime import datetime

# # ✅ GPT 요약 프롬프트 (기업 개요 기반)
# def build_summary_prompt(profile: dict, investor_type: str) -> str:
#     guide = {
#         "안정형": "장기적 재무 안정성과 배당 관점에서 분석해주세요.",
#         "공격형": "단기 고수익 또는 고성장 관점에서 분석해주세요.",
#         "융합형": "수익성과 안정성 사이 균형에 대해 분석해주세요."
#     }

#     prompt = f"""
# 다음은 한 기업의 개요입니다.
# '{investor_type}' 투자자에게 적합한 전략을 
# 한줄 제시하세요.

# [기업 개요]
# - 회사명: {profile.get("회사명")}
# - 상장여부: {profile.get("상장여부")}

# [투자자 유형: {investor_type}]
# {guide[investor_type]}
# """
#     return prompt

# ✅ GPT 뉴스 요약 프롬프트
def build_news_summary_prompt(news_items: list, sentiments: list) -> str:
    def clean_html(raw_text):
        clean = re.compile('<.*?>')
        return re.sub(clean, '', raw_text).strip()
    def format_date(date_str):
        try:
            dt = datetime.strptime(date_str, '%a, %d %b %Y %H:%M:%S %z')
            return dt.strftime('%Y.%m.%d')
        except Exception:
            return date_str
    joined = "\n".join(
        f"- [{format_date(item['date'])}] {clean_html(item['title'])}\n"
        f"  {clean_html(item['body'])}\n"
        f"  링크: {item['link']}"
        for item in news_items
    )

    prompt_lines = f"""
다음은 특정 기업과 관련된 최근 뉴스 제목, 링크, 감성 분석 결과입니다.
이 기업의 투자 관점에서 핵심 뉴스 흐름과 긍·부정 시사점을 요약해 주세요.

[뉴스 목록]
{joined}
"""
    return "\n".join(prompt_lines)



# ✅ GPT 요약
def gpt_summary(profile: dict, user_purpose: str ="안정형"):
    categories = "패션, 물류, 핀테크, 유통, 콘텐츠, 플랫폼, 커머스, IT, 미디어, 제조, 기타"
    keywords = "예시: ["#2030", "#남성패션", "#MZ,"]" 주요 사업 아이템이나 고객에 대한 정보 제공"
    investor_types = "#공격형, #안정형, #혼합형"

    prompt = f"""당사는 다음과 같은 기업입니다:

[기업 개요]
- 회사명: {profile.get("회사명")}
- 상장여부: {profile.get("상장여부")}



넌 20년 된 투자 전문가야. 일반인에게 설명할 거야.

1. 이 기업이 속한 주요 산업 분야를 반드시 다음 중 하나로 판단해서 출력해줘 (그 외는 절대 출력하지 마):
{categories}

2. 다음 중 최대 2개의 키워드를 골라 해시태그로 출력해줘 (예:"#2030 #남성패션 #MZ"와 같이 그 기업의 핵심 사업 아이템이나 상황을 잘 드러내는 키워드)],
  "):
{keywords}

3. 반드시 다음 중 하나를 세 번째 키워드로 붙여줘 (항상 마지막에 위치해야 해):
{investor_types}

4. 이 기업을 전문가 관점에서 핵심 요점만 뽑아 한 문장으로 요약해줘.

출력 형식은 다음과 같아야 해:

{{
  "주요 분야": "패션",
  "키워드": ["#2030", "#남성패션", "#MZ" 와 같이 그 기업의 핵심 사업 아이템이나 상황을 잘 드러내는 키워드)],
  "한 문장 요약": "이 기업은 ..."
}}"""
    try:
        res = CLIENT.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": prompt}],
            temperature=0.5
        )
        result = json.loads(res.choices[0].message.content.strip())
        return {
            "주요 분야": result.get("주요 분야"),
            "키워드": result.get("키워드"),
            "한 문장 요약": result.get("한 문장 요약")
        }
    except Exception as e:
        return {
            "주요 분야": "정보 없음",
            "키워드": ["#정보없음"],
            "한 문장 요약": f"❌ GPT 요약 실패: {e}"
        }
    
def _format_fin_snapshot(graph_data: list | None, keep_keys=None, max_years: int = 3) -> str:
    if not graph_data:
        return "없음"
    if keep_keys is None:
        keep_keys = ["매출액", "영업이익", "순이익", "ROE", "영업이익률", "부채비율", "유동비율"]
    # 최신연도 우선 정렬
    try:
        rows = sorted(graph_data, key=lambda r: str(r.get("year", "")), reverse=True)[:max_years]
    except Exception:
        rows = graph_data[:max_years]
    lines = []
    for r in rows:
        year = r.get("year", "")
        parts = []
        for k in keep_keys:
            if k in r and r[k] is not None:
                parts.append(f"{k}={r[k]}")
        if parts:
            lines.append(f"- {year}: " + ", ".join(parts))
    return "\n".join(lines) if lines else "없음"

def _format_news_brief(news_data: list | None, max_items: int = 3, body_len: int = 120) -> str:
    if not news_data:
        return "없음"
    lines = []
    for item in news_data[:max_items]:
        date = item.get("date", "")
        title = re.sub(r"<.*?>", "", str(item.get("title", ""))).strip()
        body = re.sub(r"<.*?>", "", str(item.get("body", ""))).strip()
        if len(body) > body_len:
            body = body[:body_len].rstrip() + "…"
        link = item.get("link", "")
        lines.append(f"- [{date}] {title} — {body} (링크: {link})")
    return "\n".join(lines) if lines else "없음"



def gpt_summary_finbert(
    profile: dict,
    user_purpose: str,
    emotion_label: str = "중립",           # 더 이상 프롬프트에 쓰지 않음(호환용)
    fin_snapshot: str | None = None,
    news_brief: str | None = None
) -> str:
    """
    프로필 + (선택)정량 스냅샷 + (선택)뉴스 브리프를 가볍게 참고해
    과장·제단 없이 담백한 2문장 요약을 생성한다.
    - 1문장: 최근 수치·흐름에서 보이는 포인트(있으면)
    - 2문장: 현재 상태에 대한 한 줄 관찰(주의/기회 모두 가능, 단정 금지)
    """
    company  = profile.get("회사명") or "해당 기업"
    listed   = profile.get("상장여부") or "정보없음"
    industry = profile.get("업종") or "업종 정보없음"
    business = profile.get("사업개요") or ""
    est      = profile.get("설립일") or ""
    hq       = profile.get("본사위치") or ""
    ceo      = profile.get("대표자명") or ""

    fin_block  = fin_snapshot or "없음"
    news_block = news_brief or "없음"

    prompt = f"""
너는 20년 경력의 투자 애널리스트다. 아래 정보를 바탕으로 **담백한 2문장**의 한국어 요약을 작성해라.
- 과도한 긍/부정 판단이나 결론(권고) 없이, 관찰된 사실과 흐름 위주로 간결하게.
- 수치나 뉴스가 있으면 가볍게 인용하되, 자료에 없는 내용은 만들지 말 것.
- 단정 대신 '보인다/관찰된다/가능성이 있다' 같은 표현을 선호.
- 문장 수는 2개를 유지하되, 템플릿처럼 보이지 않게 자연스럽게 작성.

[기업 프로필]
- 회사명: {company}
- 상장여부: {listed}
- 업종: {industry}
- 사업개요: {business}
- 설립일: {est}
- 본사위치: {hq}
- 대표자명: {ceo}

[정량 스냅샷(최대 3개년·선택)]
{fin_block}

[주요 뉴스(최대 3건·선택)]
{news_block}

출력: 자연스러운 한국어 문장 2개.
"""

    res = CLIENT.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.5
    )
    text = res.choices[0].message.content.strip()

    # ✅ 보정: 2문장 초과면 앞 2개만 사용, 미만이면 그대로(패딩/강제 생성 금지)
    sents = [s.strip() for s in re.split(r'(?<=[.?!])\s+', text) if s.strip()]
    if len(sents) > 2:
        return " ".join(sents[:2])
    return " ".join(sents)[:1000]


# GPT_SYSTEM_PROMPT = (
#     "너는 한국 기업 리스크를 요약하는 애널리스트야. "
#     "입력 JSON(뉴스/레드키워드/펀더멘털/라벨/위험도/주요 제목)을 보고 1~2문장으로, "
#     "최대 120자 이내 한국어 존댓말로 친근하게, 중학생 수준의 쉬운 말로 요약하라. "
#     "요구사항: "
#     "1) 첫 문장에 레드키워드 개수와 핵심 부정 키워드를 괄호로 구체적으로 제시하라. "
#     "   예: '레드키워드 1건(자본잠식/부도/파산/채무불이행)…' "
#     "2) 가능하면 기사 제목에서 구체 사례 1개를 짧게 넣어라. 예: '아동 낙상 사고' "
#     "3) 둘째 문장에 완화/검토/가능성 등의 표현이 기사에 보이면 '하지만 … 가능성도 있네요!'처럼 "
#     "4) 출력은 오직 요약 문장만, 접두사/접미사/불릿/이모지는 쓰지 말 것."
# )


#     # 6) GPT 한 줄 요약
#     top_titles = [it.get("title", "") for it in items][:3]
#     combined = {
#         "final_label": final_label,    # ← risk_pct 가드레일 반영된 라벨
#         "total_score": total_score,    # ← 펀더멘털 flag + 뉴스 점수
#         "risk_pct": risk_pct,          # ← calibrate_risk 결과
#         "one_liner": gpt_one_liner(company, news, fundamental, {
#             "final_label": final_label,
#             "total_score": total_score,
#             "risk_pct": risk_pct,
#         }, top_titles)                 # ← 프롬프트 기반 GPT 한줄요약
#     }


#     # 7) 결과 반환
#     return {
#         "company": company,
#         "news": news,
#         "fundamental": fundamental,
#         "combined": combined,
#         "items": items
#     }

#    result = evaluate_company(keyword)
#     corp = result["company"]; news = result["news"]; fundamental = result["fundamental"]; combined = result["combined"]

# # 색상·리스크 관련 코멘트
#     mapping = {"안정": "✅ 안정 - 초록색", "양호": "🟨 양호 - 노란색", "주의": "🟥 주의 - 빨간색"}
#     print("\n" + mapping.get(combined["final_label"], "ℹ️ 알 수 없음 - 회색"),
#           f"(잠재적 위험도 {combined['risk_pct']:.1f}%)")
#     print(f"[리스크 조언] {', '.join(fundamental.get('reasons',[])) or '없음'}")

# if __name__ == "__main__":
#     main()