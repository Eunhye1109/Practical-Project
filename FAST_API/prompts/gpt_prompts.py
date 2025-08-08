from utils.config import CLIENT
import json

# # ✅ GPT 요약 프롬프트 (기업 개요 기반)
# def build_summary_prompt(profile: dict, investor_type: str) -> str:
#     guide = {
#         "안정형": "장기적 재무 안정성과 배당 관점에서 분석해주세요.",
#         "공격형": "단기 고수익 또는 고성장 관점에서 분석해주세요.",
#         "융합형": "수익성과 안정성 사이 균형에 대해 분석해주세요."
#     }

#     prompt = f"""
# 다음은 한 기업의 개요입니다.
# '{investor_type}' 투자자에게 적합한 전략을 
# 한줄 제시하세요.

# [기업 개요]
# - 회사명: {profile.get("회사명")}
# - 상장여부: {profile.get("상장여부")}

# [투자자 유형: {investor_type}]
# {guide[investor_type]}
# """
#     return prompt

# ✅ GPT 뉴스 요약 프롬프트
def build_news_summary_prompt(news_items: list, sentiments: list) -> str:
    joined = "\n".join(
        f"- {item['title']} ({sentiment})\n  {item['link']}"
        for item, sentiment in zip(news_items, sentiments)
    )

    prompt = f"""
다음은 특정 기업과 관련된 최근 뉴스 제목, 링크, 감성 분석 결과입니다.
이 기업의 투자 관점에서 핵심 뉴스 흐름과 긍·부정 시사점을 요약해 주세요.

[뉴스 목록]
{joined}
"""
    return prompt



# ✅ GPT 요약
def gpt_summary(profile: dict, user_purpose: str ="안정형"):
    categories = "패션, 물류, 핀테크, 유통, 콘텐츠, 플랫폼, 커머스, IT, 미디어, 제조, 기타"
    keywords = "예시: ["#2030", "#남성패션", "#MZ,"]" 주요 사업 아이템이나 고객에 대한 정보 제공"
    investor_types = "#공격형, #안정형, #혼합형"

    prompt = f"""당사는 다음과 같은 기업입니다:

[기업 개요]
- 회사명: {profile.get("회사명")}
- 상장여부: {profile.get("상장여부")}



넌 20년 된 투자 전문가야. 일반인에게 설명할 거야.

1. 이 기업이 속한 주요 산업 분야를 반드시 다음 중 하나로 판단해서 출력해줘 (그 외는 절대 출력하지 마):
{categories}

2. 다음 중 최대 2개의 키워드를 골라 해시태그로 출력해줘 (예:"#2030 #남성패션 #MZ"와 같이 그 기업의 핵심 사업 아이템이나 상황을 잘 드러내는 키워드)],
  "):
{keywords}

3. 반드시 다음 중 하나를 세 번째 키워드로 붙여줘 (항상 마지막에 위치해야 해):
{investor_types}

4. 이 기업을 전문가 관점에서 핵심 요점만 뽑아 한 문장으로 요약해줘.

출력 형식은 다음과 같아야 해:

{{
  "주요 분야": "패션",
  "키워드": ["#2030", "#남성패션", "#MZ" 와 같이 그 기업의 핵심 사업 아이템이나 상황을 잘 드러내는 키워드)],
  "한 문장 요약": "이 기업은 ..."
}}"""
    try:
        res = CLIENT.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": prompt}],
            temperature=0.5
        )
        result = json.loads(res.choices[0].message.content.strip())
        return {
            "주요 분야": result.get("주요 분야"),
            "키워드": result.get("키워드"),
            "한 문장 요약": result.get("한 문장 요약")
        }
    except Exception as e:
        return {
            "주요 분야": "정보 없음",
            "키워드": ["#정보없음"],
            "한 문장 요약": f"❌ GPT 요약 실패: {e}"
        }

