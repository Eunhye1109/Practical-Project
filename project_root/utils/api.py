# 기업 코드, API 요청

# utils/api.py

"""
[기능] DART API 관련 공통 유틸
- 기업 코드 조회
- 재무 데이터 요청
"""

import requests
import zipfile
import io
import xml.etree.ElementTree as ET
import os
from config import API_KEY

CORP_XML_PATH = "CORPCODE.xml"


def download_corp_code_xml():
    """DART에서 기업코드 XML 파일 다운로드 및 압축 해제"""
    url = "https://opendart.fss.or.kr/api/corpCode.xml"
    res = requests.get(url, params={"crtfc_key": API_KEY})
    with zipfile.ZipFile(io.BytesIO(res.content)) as zf:
        zf.extractall()


def get_corp_code_dict():
    """기업명 → 기업코드 매핑 딕셔너리 생성"""
    # 항상 로컬 파일 사용하도록 강제
    if not os.path.exists(CORP_XML_PATH):
        raise FileNotFoundError(f"{CORP_XML_PATH} 파일이 존재하지 않습니다. 다운로드 필요.")
    if not os.path.exists(CORP_XML_PATH):
        print("CORPCODE.xml 파일이 없습니다. DART에서 다운로드합니다...")
        download_corp_code_xml()
    else:
        print("기존 CORPCODE.xml 파일을 사용합니다.")

    tree = ET.parse(CORP_XML_PATH)
    root = tree.getroot()
    return {
        el.find("corp_name").text.strip(): el.find("corp_code").text.strip()
        for el in root.findall("list")
    }

def fetch_financial_data(corp_code: str, year: int) -> dict:
    """특정 기업, 연도에 대해 단일회사 전체 재무제표 조회 (연결 기준)"""
    url = "https://opendart.fss.or.kr/api/fnlttSinglAcntAll.json"
    params = {
        "crtfc_key": API_KEY,
        "corp_code": corp_code,
        "bsns_year": year,
        "reprt_code": "11011",  # 사업보고서
        "fs_div": "CFS"  # 연결재무제표 기준
    }
    try:
        return requests.get(url, params=params, timeout=10).json()
    except Exception:
        return {}
    data = fetch_financial_data(corp_code, year)
    print(f"[{year}] API 결과 rows: {len(data.get('list', []))}")
