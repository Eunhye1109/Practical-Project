import os
import logging
import xml.etree.ElementTree as ET
from fastapi import HTTPException

# 프로젝트 루트 경로 기준 CORPCODE.xml 경로 계산
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = os.path.abspath(os.path.join(BASE_DIR, ".."))
XML_PATH = os.path.join(PROJECT_ROOT, "CORPCODE.xml")

logger = logging.getLogger(__name__)


def load_corp_code_xml():
    """CORPCODE.xml을 파싱하여 루트 반환"""
    if not os.path.exists(XML_PATH):
        raise HTTPException(status_code=500, detail="❌ CORPCODE.xml 파일이 존재하지 않습니다.")

    try:
        tree = ET.parse(XML_PATH)
        return tree.getroot()
    except ET.ParseError as e:
        raise HTTPException(status_code=500, detail=f"XML 파싱 오류: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"CORPCODE.xml 로딩 실패: {str(e)}")


def get_corp_code(corp_name: str) -> str:
    """
    corp_name이 정확히 일치하는 기업의 corp_code 반환
    """
    logger.info(f"기업명 정확일치 검색 요청: {corp_name}")
    root = load_corp_code_xml()

    for node in root.iter("list"):
        name_elem = node.find("corp_name")
        code_elem = node.find("corp_code")

        if name_elem is not None and code_elem is not None:
            if name_elem.text.strip() == corp_name.strip():
                return code_elem.text.strip()

    raise HTTPException(status_code=404, detail=f"기업명 '{corp_name}'에 해당하는 corp_code를 찾지 못했습니다.")


def get_corp_list(keyword: str):
    """
    corp_name에 keyword가 포함된 기업 리스트 반환
    """
    logger.info(f"기업명 포함 검색 요청: {keyword}")
    keyword_lower = keyword.lower()
    root = load_corp_code_xml()

    matched = []

    for node in root.iter("list"):
        name_elem = node.find("corp_name")
        code_elem = node.find("corp_code")

        if name_elem is not None and code_elem is not None:
            name = name_elem.text.strip()
            if keyword_lower in name.lower():
                matched.append({
                    "corp_name": name,
                    "corp_code": code_elem.text.strip()
                })
    print(f"🔍 [get_corp_list] keyword='{keyword}', matched={len(matched)}건")
    return matched