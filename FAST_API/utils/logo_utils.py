# utils/logo_utils.py
import os, json
from prompts.gpt_logo_prompt import build_logo_slug_prompt
from utils.config import CLIENT, LOGO_API_TOKEN, LOGO_CACHE_PATH as _RAW_CACHE_PATH

# ✅ None일 때 기본 경로로 폴백
BASE_DIR = os.path.dirname(__file__)
LOGO_CACHE_PATH = _RAW_CACHE_PATH or os.path.join(BASE_DIR, "cache", "logo_cache.json")

def load_logo_cache() -> dict:
    try:
        if os.path.exists(LOGO_CACHE_PATH):
            with open(LOGO_CACHE_PATH, "r", encoding="utf-8") as f:
                return json.load(f)
    except Exception as e:
        print(f"⚠️ logo cache load fail: {e}")
    return {}

def save_logo_cache(cache: dict):
    try:
        os.makedirs(os.path.dirname(LOGO_CACHE_PATH), exist_ok=True)
        with open(LOGO_CACHE_PATH, "w", encoding="utf-8") as f:
            json.dump(cache, f, ensure_ascii=False, indent=2)
    except Exception as e:
        print(f"⚠️ logo cache save fail: {e}")

def guess_english_slug_from_korean(kor_name: str) -> str:
    if not kor_name:
        return ""
    prompt = build_logo_slug_prompt(kor_name)
    try:
        resp = CLIENT.chat.completions.create(
            model="gpt-4o",
            messages=[{"role":"user","content":prompt}],
            temperature=0
        )
        return (resp.choices[0].message.content or "").strip().lower()
    except Exception as e:
        print(f"❌ GPT 추론 실패: {e}")
        return ""

def _placeholder_logo(name: str) -> str:
    # ✅ 이름 이니셜로 대체 아바타
    from urllib.parse import quote
    seed = quote(name or "Unknown")
    return f"https://api.dicebear.com/7.x/initials/svg?seed={seed}&radius=10&fontSize=40"

def get_logo_url(kor_company_name: str) -> str:
    try:
        cache = load_logo_cache()
        if kor_company_name in cache:
            return cache[kor_company_name]

        slug = guess_english_slug_from_korean(kor_company_name)
        if slug:
            url = f"https://img.logo.dev/{slug}.com?token={LOGO_API_TOKEN}&retina=true"
        else:
            url = _placeholder_logo(kor_company_name)  # ✅ 폴백

        cache[kor_company_name] = url
        save_logo_cache(cache)
        return url
    except Exception as e:
        print(f"⚠️ get_logo_url fail: {e}")
        return _placeholder_logo(kor_company_name)
