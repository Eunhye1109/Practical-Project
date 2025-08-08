import requests


from utils.config import DARTAPI_KEY, NAVER_CLIENT_ID, NAVER_CLIENT_SECRET


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
    }




# # ✅ 뉴스 기사 수집 (본문 + 링크)
# def fetch_news_articles(keyword: str, max_count: int = 5):
#     url = "https://openapi.naver.com/v1/search/news.json"
#     headers = {
#         "X-Naver-Client-Id": NAVER_CLIENT_ID,
#         "X-Naver-Client-Secret": NAVER_CLIENT_SECRET
#     }
#     params = {"query": keyword, "display": max_count, "sort": "date"}
#     res = requests.get(url, headers=headers, params=params)
#     if res.status_code != 200:
#         return []
#     return [{
#         "title": item["title"],
#         "description": item["description"],
#         "link": item["link"]
#     } for item in res.json().get("items", [])]