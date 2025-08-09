# 🔹 DART API 및 파서 통합

import os
import requests
import xml.etree.ElementTree as ET
from typing import Optional
from fastapi import HTTPException
from utils.config import DARTAPI_KEY, YEARS, REPRT_CODE, FS_DIV_OPTIONS
from utils.corp_code import get_corp_name
from utils.api_util import fetch_corp_emp_data
import logging



def fetch_corp_data(corp_code: str, user_purpose: Optional[str] = None):
    print(f"📦 [fetch_corp_data] corp_code={corp_code}, user_purpose={user_purpose}")

    if not corp_code:
        raise HTTPException(status_code=400, detail="corp_code는 필수입니다.")
    
    corp_name = get_corp_name(corp_code)
    result = {}
    success = False

    # ✅ [1] 재무정보 수집
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
                if res.get("list"):
                    result[str(year)] = {
                        item["account_nm"]: item.get("thstrm_amount", "0")
                        for item in res["list"]
                    }
                    result[str(year)]["fs_div_used"] = fs_div
                    year_success = True
                    break
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

    # ✅ [2] 인사정보 수집 시도
    try:
        emp_data = fetch_corp_emp_data(corp_code)
        for year in YEARS:
            if year in emp_data and year in result:
                # ✅ 동일 연도에 병합 (ex: 평균인건비, 직원수)
                for k, v in emp_data[year].items():
                    if k != "fs_div_used":  # 중복 방지
                        result[year][k] = v
        print("✅ 인사정보 병합 완료")
    except Exception as e:
        print(f"⚠️ 인사정보 수집 실패: {e}")

    # ✅ [3] 최종 기본 정보 추가
    result["corpName"] = corp_name
    result["corpCode"] = corp_code

    return result


