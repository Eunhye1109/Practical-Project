
# ✅ GPT 요약 프롬프트 (기업 개요 기반)
def build_summary_prompt(profile: dict, investor_type: str) -> str:
    guide = {
        "안정형": "장기적 재무 안정성과 배당 관점에서 분석해주세요.",
        "공격형": "단기 고수익 또는 고성장 관점에서 분석해주세요.",
        "융합형": "수익성과 안정성 사이 균형에 대해 분석해주세요."
    }

    prompt = f"""
다음은 한 기업의 개요입니다. 산업 특징, 주요 사업영역, 규모, R&D 투자, 리스크 등을 요약하고,
'{investor_type}' 투자자에게 적합한 전략을 제시하세요.

[기업 개요]
- 기업명: {profile.get("기업명")}
- 대표자명: {profile.get("대표자명")}
- 업종코드: {profile.get("업종코드")}
- 상장여부: {profile.get("상장여부")}
- 설립일자: {profile.get("설립일자")}
- 주소: {profile.get("주소")}
- 지주회사: {profile.get("지주회사") or '없음'}

[투자자 유형: {investor_type}]
{guide[investor_type]}
"""
    return prompt

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
