# 🔹 DART API 및 파서 통합

import os
import requests
import xml.etree.ElementTree as ET
from fastapi import HTTPException
from utils.config import DARTAPI_KEY, YEARS
import logging

def get_corp_name(corp_code: str) -> str:
    """
    CORPCODE.xml에서 기업이름을 반환합니다.
    정확히 일치하는 corp_code가 존재하면 corp_name 반환,
    없으면 404 예외 발생.
    """
    logger = logging.getLogger(__name__)
    logger.info(f"기업명 조회 요청: {corp_code}")

    # 루트 경로 기준 XML 파일 경로
    BASE_DIR = os.path.dirname(os.path.abspath(__file__))
    PROJECT_ROOT = os.path.abspath(os.path.join(BASE_DIR, ".."))
    xml_path = os.path.join(PROJECT_ROOT, "CORPCODE.xml")

    if not os.path.exists(xml_path):
        raise HTTPException(status_code=500, detail="❌ CORPCODE.xml 파일이 존재하지 않습니다.")

    try:
        tree = ET.parse(xml_path)
        root = tree.getroot()
    except ET.ParseError as e:
        raise HTTPException(status_code=500, detail=f"XML 파싱 오류: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"CORPCODE.xml 로딩 실패: {str(e)}")

    for node in root.iter("list"):
        code_elem = node.find("corp_code")
        name_elem = node.find("corp_name")

        if code_elem is not None and name_elem is not None:
            if code_elem.text.strip() == corp_code.strip():
                return name_elem.text.strip()

    raise HTTPException(status_code=404, detail=f"corp_code '{corp_code}'에 해당하는 기업명을 찾지 못했습니다.")


def fetch_corp_data(corp_code: str):
    """
    corp_code을 기준으로 DART에서 재무정보를 연도별로 가져와 dict로 반환
    """
    corp_name = get_corp_name(corp_code)
    if not corp_code:
         raise HTTPException(status_code=400, detail="corp_code는 필수입니다.")

    result = {}

    for year in YEARS:
        url = (
            f"https://opendart.fss.or.kr/api/fnlttSinglAcnt.json?"
            f"crtfc_key={DARTAPI_KEY}&corp_code={corp_code}&bsns_year={year}"
            f"&reprt_code=11011&fs_div=CFS"
        )

        try:
            res = requests.get(url, timeout=10).json()
            if res.get("list"):
                result[str(year)] = {
                    item["account_nm"]: item.get("thstrm_amount", "0")
                    for item in res["list"]
                }
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"{year}년도 데이터 조회 실패: {str(e)}")
