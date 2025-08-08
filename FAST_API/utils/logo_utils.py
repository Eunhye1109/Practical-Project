
# GPT 기반 slug 추론 함수 (프롬프트 외부 정의 사용)
from prompts.gpt_logo_prompt import build_logo_slug_prompt
from utils.config import CLIENT,LOGO_API_TOKEN,LOGO_CACHE_PATH
import os
import json


def load_logo_cache() -> dict:
    if os.path.exists(LOGO_CACHE_PATH):
        with open(LOGO_CACHE_PATH, "r", encoding="utf-8") as f:
            return json.load(f)
    return {}

def save_logo_cache(cache: dict):
    os.makedirs(os.path.dirname(LOGO_CACHE_PATH), exist_ok=True)
    with open(LOGO_CACHE_PATH, "w", encoding="utf-8") as f:
        json.dump(cache, f, ensure_ascii=False, indent=2)


def guess_english_slug_from_korean(kor_name: str) -> str:
    prompt = build_logo_slug_prompt(kor_name)
    try:
        response = CLIENT.chat.completions.create(
            model="gpt-4o",
            messages=[{"role": "user", "content": prompt}],
            temperature=0
        )
        slug = response.choices[0].message.content.strip().lower()
        return slug
    except Exception as e:
        print(f"❌ GPT 추론 실패: {e}")
        return ""

def get_logo_url(kor_company_name: str) -> str:
    logo_cache = load_logo_cache()
    if kor_company_name in logo_cache:
        return logo_cache[kor_company_name]

    slug = guess_english_slug_from_korean(kor_company_name)
    if not slug:
        return f"https://img.logo.dev/{slug}.com?token={LOGO_API_TOKEN}&retina=true"

    logo_url = f"https://img.logo.dev/{slug}.com?token={LOGO_API_TOKEN}&retina=true"
    logo_cache[kor_company_name] = logo_url
    save_logo_cache(logo_cache)
    return logo_url
