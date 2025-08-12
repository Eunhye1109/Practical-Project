# 🔹 DART API 및 파서 통합

import os
import requests
import xml.etree.ElementTree as ET
from typing import Optional
from fastapi import HTTPException
from utils.config import DARTAPI_KEY, YEARS, REPRT_CODE, FS_DIV_OPTIONS
from utils.corp_code import get_corp_name
from utils.api_util import fetch_corp_emp_data, fetch_news_articles



def fetch_corp_data(corp_code: str, user_purpose: Optional[str] = None):
    print(f"📦 [fetch_corp_data] corp_code={corp_code}, user_purpose={user_purpose}")

    if not corp_code:
        raise HTTPException(status_code=400, detail="corp_code는 필수입니다.")
    
    corp_name = get_corp_name(corp_code)
    result = {}
    result["corpName"] = corp_name
    result["corpCode"] = corp_code

    # ✅ [1] 재무정보 수집
    for year in YEARS:
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
                    break
                else:
                    print(f"⚠️ DART 응답 없음: year={year}, fs_div={fs_div}")
            except Exception as e:
                print(f"❌ {year}년도 {fs_div} 조회 실패: {str(e)}")

    # ✅ [2] 인사정보 수집 시도
    try:
        emp_data = fetch_corp_emp_data(corp_code)
        for year in YEARS:
            if year in emp_data:
                if year not in result:
                    result[year] = {}
                for k, v in emp_data[year].items():
                    if k != "fs_div_used":
                        result[year][k] = v
        print("✅ 인사정보 병합 완료")
    except Exception as e:
        print(f"⚠️ 인사정보 수집 실패: {e}")

    # [배당(alot)] 수집/병합
    try:
        alot_data = fetch_corp_dividend_data(corp_code)

        # 1) alot 원본을 result[연도]에 먼저 병합
        
        for y in YEARS:
            ystr = str(y)
            ymap = (alot_data or {}).get(ystr)
            if ymap:
                result.setdefault(ystr, {}).update(ymap)

        DEFAULT_DIVIDEND = {
        "주당 현금배당금(원)": 0,
        "현금배당수익률(%)": 0.0,
        "주식배당수익률(%)": 0.0,
        "(연결)현금배당성향(%)": 0.0,
        }
        # 2) 병합 직후 캐논키 생성
        for y in YEARS:
            ystr = str(y)
            if ystr in result:
                canon = _build_dividend_canon(result[ystr])  # ← 이제 원본 키가 존재!
                result[ystr].update(canon)

                # (선택) 퍼지매칭 원천 차단: 원본 suffix 키 제거
                for k in list(result[ystr].keys()):
                    if "|보통주" in k or "|우선주" in k:
                        del result[ystr][k]

        # 디버그
        for y in YEARS:
            ystr = str(y)
            if ystr in result:
                keys = sorted([k for k in result[ystr].keys()
                            if ("배당" in k or "수익률" in k or "성향" in k)])
                print(f"[final dividend keys {ystr}] {keys}")

        print("✅ 배당(alot) 병합 완료")
    except Exception as e:
        print(f"⚠️ 배당(alot) 수집 실패: {e}")

    # 뉴스 정보
    try:
        news_data = fetch_news_articles(corp_name)[:3]  # 최대 3개
        result["newsData"] = news_data
        print(f"📰 news ok: {len(news_data)}건, signal={result['newsSignal']}")
        result["newsSummaryPrompt"] = build_news_summary_prompt(news_data)
    except Exception as e:
        result["newsData"] = []
        print(f"⚠️ 뉴스 수집 실패: {e}")

    return result
