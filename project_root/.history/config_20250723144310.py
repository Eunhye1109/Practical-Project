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