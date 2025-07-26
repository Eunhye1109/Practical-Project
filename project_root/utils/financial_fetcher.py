# # utils/financial_fetcher.py

# """
# [통합 재무데이터 수집 모듈]
# - corp_code와 year를 받아 해당 연도의 주요 재무제표 항목을 한 번에 수집
# - 반환 형태는 분석 함수가 쉽게 사용하도록 dict 형태로 제공
# """

# import requests
# import time

# from config import API_KEY, REPRT_CODE
# from utils.api import fetch_financial_data
# from config import YEARS

# API_URL = "https://opendart.fss.or.kr/api/fnlttSinglAcntAll.json"


# def fetch_financial_data(corp_code: str, year: int) -> dict:
#     params = {
#         "crtfc_key": API_KEY,
#         "corp_code": corp_code,
#         "bsns_year": year,
#         "reprt_code": REPRT_CODE
#     }
#     res = requests.get(API_URL, params=params)
#     data = res.json()
#     time.sleep(0.3)  # 요청 제한 고려한 딜레이

#     if data.get("status") != "000" or not data.get("list"):
#         print(f"⚠️ 재무데이터 수신 실패: {year} ({data.get('message')})")
#         return {}

#     # 계정명 기준으로 매핑
#     result = {}
#     for row in data["list"]:
#         account_nm = row.get("account_nm")
#         amount = row.get("thstrm_amount")  # 당기 금액
#         if account_nm and amount:
#             clean_amount = amount.replace(",", "")
#             try:
#                 result[account_nm] = float(clean_amount)
#             except ValueError:
#                 pass

#     return result


