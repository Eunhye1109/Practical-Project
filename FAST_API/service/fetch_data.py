# 🔹 DART API 및 파서 통합

import os
import requests
import xml.etree.ElementTree as ET
from typing import Optional
from fastapi import HTTPException
from utils.config import DARTAPI_KEY, YEARS, REPRT_CODE, FS_DIV_OPTIONS
from utils.corp_code import get_corp_name
import logging



def fetch_corp_data(corp_code: str, user_purpose: Optional[str] = None):
    print(f"📦 [fetch_corp_data] corp_code={corp_code}, user_purpose={user_purpose}")
    """
    corp_code을 기준으로 DART에서 재무정보를 연도별로 가져와 dict로 반환
    """
    corp_name = get_corp_name(corp_code)
    if not corp_code:
         raise HTTPException(status_code=400, detail="corp_code는 필수입니다.")

    result = {}
    success = False

    for year in YEARS:
        year_success = False

        for fs_div in FS_DIV_OPTIONS:
            url = (
                f"https://opendart.fss.or.kr/api/fnlttSinglAcnt.json?"
                f"crtfc_key={DARTAPI_KEY}&corp_code={corp_code}&bsns_year={year}"
                f"&reprt_code={REPRT_CODE}&fs_div={fs_div}"
            )
            print(f"📡 요청 중: year={year}, fs_div={fs_div}")

            try:
                res = requests.get(url, timeout=10).json()

                if res.get("list"):  # ✅ 데이터가 있으면 저장 후 다음 연도로
                    result[str(year)] = {
                        item["account_nm"]: item.get("thstrm_amount", "0")
                        for item in res["list"]
                    }
                    result[str(year)]["fs_div_used"] = fs_div  # ✅ 선택적으로 성공한 fs_div 기록
                    year_success = True
                    break  # ✅ 성공했으면 다음 연도로
                else:
                    print(f"⚠️ DART 응답 없음: year={year}, fs_div={fs_div}")
            except Exception as e:
                raise HTTPException(status_code=500, detail=f"{year}년도 {fs_div} 조회 실패: {str(e)}")

        if not year_success:
            print(f"❌ {year}년도 재무정보 수집 실패")
        else:
            success = True

    if not success:
        raise HTTPException(status_code=404, detail="DART에 등록된 재무정보가 없습니다.")

    result["corpName"] = corp_name
    result["corpCode"] = corp_code
    return result

