# 공통 설정

# config.py

"""
[설정 파일]
공통으로 사용하는 API KEY, 연도 목록 등을 정의
"""

API_KEY = "845166f5401aeebbed295c86b5f47621b51f520a"  # 🔐 반드시 본인의 DART API 키로 교체하세요

# 분석 대상 연도 (최근 3년 등으로 수정 가능)
YEARS = [2021, 2022, 2023]

# 결과 저장 경로 (선택)
RESULT_DIR = "./results/"

# 보고서 종류
REPRT_CODE = "11011"

# DART API 가져올 URL
URL_FIN = "https://opendart.fss.or.kr/api/fnlttSinglAcntAll.json"

URL_CORP_CODE = "https://opendart.fss.or.kr/api/corpCode.xml"

# config.py 또는 main.py
STANDARD_COLUMNS = [
    "자본총계", "부채총계", "매출액", "유동자산", "유동부채", 
    "영업이익", "순수익", "직원 수", "평균 인건비", "R&D비용"
]

MANUAL_MAP = {
  "총매출": ["수익(매출액)", "매출액", "매출", "총매출액"],
  "영업이익": ["영업이익", "영업이익(손실)", "영업이익률"],
  "순이익": ["당기순이익", "당기순이익(손실)", "계속영업이익", "지배기업의 소유주에게 귀속되는 당기순이익(손실)"],
  "자기자본": ["자본총계", "기말자본", "지배기업 소유주지분"],
  "R&D 투자금": ["연구개발비", "연구개발비용", "개발비", "R&D 투자"],
  "전체 직원 수": ["종업원수", "전체 직원 수", "평균종업원수", "종업원 총계"]
}
