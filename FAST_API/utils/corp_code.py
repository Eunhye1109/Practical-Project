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
    total_count = 0

    for node in root.iter("list"):
        name_elem = node.find("corp_name")
        code_elem = node.find("corp_code")
        total_count += 1

        if name_elem is not None and code_elem is not None:
            name = name_elem.text.strip()
            code = code_elem.text.strip()       
            print(f"🔍 [DEBUG] corp_name={name}, corp_code={code}")
            if keyword_lower in name.lower():
                matched.append({
                    "corp_name": name,
                    "corp_code": code_elem.text.strip()
                })
    print(f"🔍 [get_corp_list] keyword='{keyword}', matched={len(matched)}건",total_count)
    return matched

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
