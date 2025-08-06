# 현재 embedding_service.py에서 모든 기능 처리 중
# 나중에 클래스로 분리할 경우 여기에 재배치 예정



# 혹시 몰라서 쓸 수 도 있는 코드들 모아두기

# # ✅ 계열사
# def collect_affiliates(corp_code):
#     url = "https://opendart.fss.or.kr/api/dsclSttus.json"
#     params = {
#         "crtfc_key": API_KEY,
#         "corp_code": corp_code,
#         "bsns_year": DEFAULT_YEAR,
#         "reprt_code": REPRT_CODE
#     }
#     res = requests.get(url, params=params).json()
#     if res.get("status") != "000":
#         return []
#     return [item.get("corp_name") for item in res.get("list", []) if item.get("corp_name")]
