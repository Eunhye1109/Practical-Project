# 🔹 DART API 및 파서 통합

import requests
import xml.etree.ElementTree as ET
from utils.config import API_KEY

def get_corp_code(corp_name: str):
    url = f"https://opendart.fss.or.kr/api/corpCode.xml?crtfc_key={API_KEY}"
    res = requests.get(url)
    root = ET.fromstring(res.content)

    for list_node in root.iter("list"):
        if list_node.find("corp_name").text == corp_name:
            return list_node.find("corp_code").text
    return None

def fetch_corp_data(corp_name: str):
    corp_code = get_corp_code(corp_name)
    if not corp_code:
        return {"error": "기업명을 찾을 수 없습니다."}

    result = {}
    for year in YEARS:
        url = (
            f"https://opendart.fss.or.kr/api/fnlttSinglAcnt.json?"
            f"crtfc_key={API_KEY}&corp_code={corp_code}&bsns_year={year}"
            f"&reprt_code=11011&fs_div=CFS"
        )
        res = requests.get(url).json()
        if res.get("list"):
            result[str(year)] = {
                item["account_nm"]: item.get("thstrm_amount", "0")
                for item in res["list"]
            }
    return result
