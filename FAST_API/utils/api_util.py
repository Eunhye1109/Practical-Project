import requests


from utils.config import DARTAPI_KEY, NAVER_CLIENT_ID, NAVER_CLIENT_SECRET, REPRT_CODE, YEARS
from fastapi import HTTPException


# ✅ 기업 개요 수집
def collect_profile(corp_code):
    url = "https://opendart.fss.or.kr/api/company.json"
    params = {"crtfc_key": DARTAPI_KEY, "corp_code": corp_code}
    res = requests.get(url, params=params).json()
    print(f"🧾 DART 응답: {res}")
    if res.get("status") != "000":
        print(f"⚠️ 기업 개요 수집 실패: {corp_code}")
        return {}
    return {
    "회사명": res.get("corp_name"),
    "상장여부": "상장" if res.get("stock_code") else "비상장",
    "업종": res.get("industry"),
    "사업개요": res.get("business"),
    "설립일": res.get("est_dt"),
    "본사위치": res.get("adres"),
    "대표자명": res.get("ceo_nm"),  # ← 추가
}



def fetch_corp_emp_data(corp_code: str) -> dict:
    if not corp_code:
        raise HTTPException(status_code=400, detail="corp_code는 필수입니다.")

    result = {}
    success = False

    for year in YEARS:
        url = (
            f"https://opendart.fss.or.kr/api/empSttus.json?"
            f"crtfc_key={DARTAPI_KEY}&corp_code={corp_code}&bsns_year={year}"
            f"&reprt_code={REPRT_CODE}"
        )
        print(f"📡 [인사정보] 요청 중: year={year}")

        try:
            res = requests.get(url, timeout=10).json()

            if res.get("list"):
                flat_data = {}

                # ✅ list 안 모든 row 탐색 (성별/사업부문 구분 없이)
                for item in res["list"]:
                    for k, v in item.items():
                        if k in ["corp_name", "corp_code", "rcept_no", "rm", "stlm_dt"]:
                            continue  # 불필요 정보 제외
                        if v is None or v == "-":
                            continue  # 비어있거나 "-"는 무시
                        
                        key = k.strip()
                        # ✅ 중복 키는 마지막 값으로 덮어씀
                        flat_data[key] = v.replace(",", "")  # 쉼표 제거해서 숫자 처리 편하게

                if flat_data:
                    result[str(year)] = flat_data
                    success = True
                else:
                    print(f"⚠️ [인사정보] 유효 데이터 없음: year={year}")
            else:
                print(f"⚠️ [인사정보] DART 응답 없음: year={year}")
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"{year}년도 인사정보 조회 실패: {str(e)}")

    if not success:
        raise HTTPException(status_code=404, detail="DART에 등록된 인사정보가 없습니다.")

    return result






# ✅ 뉴스 기사 수집 (본문 + 링크)
def fetch_news_articles(keyword: str, max_count: int = 5):
    url = "https://openapi.naver.com/v1/search/news.json"
    headers = {
        "X-Naver-Client-Id": NAVER_CLIENT_ID,
        "X-Naver-Client-Secret": NAVER_CLIENT_SECRET
    }
    params = {"query": keyword, "display": max_count, "sort": "date"}
    res = requests.get(url, headers=headers, params=params)
    if res.status_code != 200:
        return []
    news_list = []
    for item in res.json().get("items", []):
        # pubDate → YYYY.MM.DD 변환
        from datetime import datetime
        date_str = datetime.strptime(item["pubDate"], "%a, %d %b %Y %H:%M:%S %z").strftime("%Y.%m.%d")

        news_list.append({
            "date": date_str,
            "title": item["title"],
            "body": item["description"],
            "link": item["link"]
        })

    return news_list