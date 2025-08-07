
# ✅ GPT 기반 슬러그 추론 프롬프트 함수
def build_logo_slug_prompt(kor_name: str) -> str:
    prompt = f"""
다음은 한국 기업명입니다: "{kor_name}"
이 기업을 해외에서 소개할 때 가장 많이 쓰이는 영문 기업 이름 또는 도메인용 슬러그를 출력해줘. 단어는 하나 또는 단순한 단어 조합만 사용하고, 소문자로만 출력해. 예를 들어 "삼성전자" → samsung, "농심" → nongshim, "카카오" → kakao 처럼.

오직 슬러그만 출력해.
    """
    return prompt
