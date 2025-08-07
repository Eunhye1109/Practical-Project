import time
import json
import requests
from openai import OpenAI
from urllib.parse import unquote

from service.corp_code import get_corp_list
from fastapi.responses import JSONResponse
from utils.format_date import format_date
from utils.logo_utils import get_logo_url
from utils.config import (
    DARTAPI_KEY,
    OPENAI_MODEL,
    DEFAULT_TEMPERATURE,
    MAX_COMPANY_COUNT,
    client,
    SUMMARY_PROMPT_TEMPLATE
)



# ✅ 기업 개요 수집
def collect_profile(corp_code):
    url = "https://opendart.fss.or.kr/api/company.json"
    params = {"crtfc_key": DARTAPI_KEY, "corp_code": corp_code}
    res = requests.get(url, params=params).json()
    print(f"🧾 DART 응답: {res}")
    if res.get("status") != "000":
        print(f"⚠️ 기업 개요 수집 실패: {corp_code}")
        return {}
    return {
        "회사명": res.get("corp_name"),
        "상장여부": "상장" if res.get("stock_code") else "비상장",
    }


# ✅ GPT 요약 생성
def gpt_summary(profile):
    print("🧠 [DEBUG] gpt_summary 시작")
    categories = "패션, 물류, 핀테크, 유통, 콘텐츠, 플랫폼, 커머스, IT, 미디어, 제조, 기타"
    investors = "혼합형, 공격형, 안정형"

    try:
        filled_prompt = SUMMARY_PROMPT_TEMPLATE.format(
        categories=categories,
        investors=investors,
        profile=profile,
        **profile
    )
        print(f"📝 프롬프트 길이: {len(filled_prompt)}")

        res = client.chat.completions.create(
            model=OPENAI_MODEL,
            messages=[{"role": "user", "content": filled_prompt}],
            temperature=DEFAULT_TEMPERATURE
        )
        response_text = res.choices[0].message.content.strip()
        print("📄 GPT 응답 텍스트:\n", response_text)

        

        return json.loads(res.choices[0].message.content.strip())
    except Exception as e:
        print("❌ GPT 요약 실패:", e)
        return {
            "키워드": ["#정보없음"],
            "한 문장 요약": f"❌ GPT 요약 실패: {e}"
        }

# ✅ 전체 요약 수행 함수
def search_list_summary(keyword):
    print(f"\n🔍 [FastAPI] 기업 요약 요청 시작 — keyword: '{keyword}'")
    
    keyword = unquote(keyword)
    print(f"🔍 [FastAPI] 디코딩된 keyword: '{keyword}'")

    corp_list = get_corp_list(keyword)
    print(f"📄 전체 기업 수집 완료: {len(corp_list)}건")


    keyword_lower = keyword.lower()
    matches = [c for c in corp_list if keyword_lower in c["corp_name"].lower()]
    print(f"🔎 keyword 포함 기업 필터링 완료: {len(matches)}건")

    matches.sort(key=lambda c: (not c["corp_name"].startswith(keyword), c["corp_name"]))
    matches = matches[:MAX_COMPANY_COUNT]
    print(f"✅ 상위 {MAX_COMPANY_COUNT}건 정렬 및 제한 적용: {len(matches)}건")

    results = []

    for idx, corp in enumerate(matches):
        print(f"\n➡️ [{idx + 1}] 기업 분석 시작: {corp['corp_name']} ({corp['corp_code']})")
        try:
            profile = collect_profile(corp["corp_code"])
            print(f"   🧾 기업 개요 수집 완료: {profile.get('회사명')}")
            try:
                summary = gpt_summary(profile)
                print(f"   🤖 GPT 요약 성공: {summary.get('한 문장 요약')}")
                keywords = summary.get("키워드")
                gpt_summary_text = summary.get("한 문장 요약")
            except Exception as e:
                print(f"   ⚠️ GPT 요약 실패 (무시하고 진행): {e}")
                keywords = ["#정보없음"]
                gpt_summary_text = f"❌ GPT 요약 실패: {e}"
            

            print("📦 [DEBUG] append data →", {
                "corpName": profile.get("회사명"),
                "stockType": profile.get("상장여부"),
                "keywords": summary.get("키워드"),
                "gptSummary": summary.get("한 문장 요약")
            })
            results.append({
                "corpCode": corp["corp_code"],
                "corpName": profile.get("회사명"),
                "stockType": profile.get("상장여부"),
                "keywords": summary.get("키워드"),
                "gptSummary": summary.get("한 문장 요약")
                
            })
        

        except Exception as e:
            results.append({"회사명": corp["corp_name"], "오류": str(e)})

        time.sleep(1.2)  # DART 요청 제한 대응
# ✅ Spring Boot와 통신을 위한 JSON 객체 형태로 감싸기
    print(f"\n🎯 결과 총 {len(results)}건 준비 완료. 반환 중...")
    print("📤 [DEBUG] 최종 반환 JSON 데이터 →")
    print(json.dumps(results, ensure_ascii=False, indent=2))

    return JSONResponse(content=results)