# 기업 코드, API 요청

# utils/api.py

"""
[기능] DART API 관련 공통 유틸
- 기업 코드 조회
- 재무 데이터 요청
"""

import requests
import pandas as pd
import zipfile
import io
import xml.etree.ElementTree as ET
import os
from config import API_KEY, REPRT_CODE, URL_CORP_CODE, URL_FIN, YEARS

CORP_XML_PATH = "CORPCODE.xml"


def download_corp_code_xml():
    """DART에서 기업코드 XML 파일 다운로드 및 압축 해제"""
    url = URL_CORP_CODE
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

def fetch_financial_data(corp_code: str, year: int) -> pd.DataFrame:
    params = {
        "crtfc_key": API_KEY,
        "corp_code": corp_code,
        "bsns_year": year,
        "reprt_code": REPRT_CODE,
        "fs_div": "CFS"  # 연결재무제표 기준
    }
    res = requests.get(URL_FIN, params=params)
    data = res.json()
    # time.sleep(0.3)  # 요청 제한 고려한 딜레이

    if data.get("status") != "000" or not data.get("list"):
        print(f"⚠️ 재무데이터 수신 실패: {year} ({data.get('message')})")
        return {}

    # 디버깅
    for row in data.get("list", []):
        print(row.get("account_nm"))  # 어떤 항목들이 오는지 확인

    # 계정명 기준으로 매핑
    result = [{}]
    for row in data["list"]:
        account_nm = row.get("account_nm")
        amount = row.get("thstrm_amount")  # 당기 금액
        if account_nm and amount:
            try:
                clean_amount = float(amount.replace(",", ""))
                result.append({"account_nm": account_nm, "amount": clean_amount})
            except ValueError:
                continue
    df = pd.DataFrame(result)
    df.set_index("account_nm", inplace=True)

    return df

def fetch_all_yearly_data(corp_code: str, years: list[int]) -> dict[int, pd.DataFrame]:
    """연도별 재무데이터를 dict로 수집
    반환 형식: {2021: df1, 2022: df2, ...}
    """
    return {
        year: fetch_financial_data(corp_code, year)
        for year in years
    }
    # result = {}
    # for year in years:
    #     df = fetch_financial_data(corp_code, year)
    #     result[year] = df
    # return result
