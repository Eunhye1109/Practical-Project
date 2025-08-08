# #| 구성 요소            | 설명                                                                                |
# #| ---------------- | --------------------------------------------------------------------------------- |
# #| **1. 기업 검색**     | `load_corp_list()` + `find_corp_by_keyword()`를 통해 키워드 포함 기업 검색                    |
# #| **2. 기업 프로필 수집** | `collect_company_profile()`                                                       |
# #| **3. 뉴스 수집**     | `fetch_news_articles()` – NAVER API 활용                                            |
# #| **4. 감성 분석**     | `analyze_sentiment()` – FinBERT 활용                                                |
# #| **5. GPT 요약 생성** | `gpt_summary()` – 투자자 유형에 따라 분석 포인트 분기                                            |
# #| **6. 뉴스 요약 생성**  | `summarize_news_articles()` – 감성 분석 결과 포함 GPT 요약                                  |
# #| **7. 저장 처리**     | `save_reports()` – 요약 텍스트, JSON, Markdown 저장                                      |
# #| **8. 결과 반환**     | 경로 포함 딕셔너리 리턴 (`corp_name`, `summary_path`, `json_path`, `md_path`, `news_items`) |




# pip install --upgrade openai
# !pip install transformers
# import requests
# import urllib.parse
# import zipfile
# import io
# import json
# import time
# import os
# import xml.etree.ElementTree as ET
# import pandas as pd
# import openai
# import torch
# from openai import OpenAI
# from transformers import AutoTokenizer, AutoModelForSequenceClassification



# # 🔐 네이버 API 인증 정보 입력
# NAVER_CLIENT_ID = "키 안알랴줌"
# NAVER_CLIENT_SECRET = "안알랴쥼"
# DART_API_KEY = "안알랴줌!!!!!!!"
# OPENAI_API_KEY = "처음부터 개발 잘했던 김호성씨 아주 부럽다"  # 여기에 OpenAI 키 입력
# client = OpenAI(api_key=OPENAI_API_KEY)

#  # ✅ 드라이브 임포트
# from google.colab import drive
# drive.mount('/content/drive')

# # ✅ FinBERT 로드
# tokenizer = AutoTokenizer.from_pretrained("ProsusAI/finbert")
# model = AutoModelForSequenceClassification.from_pretrained("ProsusAI/finbert")

# # ✅ DART 기업 목록 불러오기
# def load_corp_list(api_key: str) -> pd.DataFrame:
#     url = f"https://opendart.fss.or.kr/api/corpCode.xml?crtfc_key={api_key}"
#     res = requests.get(url)
#     if res.status_code != 200 or b'PK' not in res.content[:2]:
#         raise Exception("❌ DART API에서 corpCode.zip을 받지 못했습니다.")
#     z = zipfile.ZipFile(io.BytesIO(res.content))
#     xml_content = z.read(z.namelist()[0])
#     root = ET.fromstring(xml_content)
#     return pd.DataFrame([{
#         "corp_code": item.findtext('corp_code'),
#         "corp_name": item.findtext('corp_name'),
#         "stock_code": item.findtext('stock_code'),
#         "modify_date": item.findtext('modify_date')
#     } for item in root.findall('list')])

# # ✅ 기업명 검색
# def find_corp_by_keyword(df: pd.DataFrame, keyword: str):
#     return df[df["corp_name"].str.contains(keyword, case=False, na=False)]

# # ✅ DART 기업 프로필 수집
# def collect_company_profile(corp_code: str, api_key: str):
#     url = "https://opendart.fss.or.kr/api/company.json"
#     params = {"crtfc_key": api_key, "corp_code": corp_code}
#     res = requests.get(url, params=params).json()
#     if res.get("status") != "000":
#         return {}
#     return {
#         "기업명": res.get("corp_name"),
#         "대표자명": res.get("ceo_nm"),
#         "사업자등록번호": res.get("bizr_no"),
#         "주소": res.get("adres"),
#         "홈페이지": res.get("hm_url"),
#         "업종코드": res.get("induty_code"),
#         "설립일자": res.get("est_dt"),
#         "상장여부": "상장" if res.get("stock_code") else "비상장",
#         "지주회사": res.get("hm_ownr_corp_nm")
#     }

# # ✅ 뉴스 기사 수집 (본문 + 링크)
# def fetch_news_articles(keyword: str, max_count: int = 5):
#     url = "https://openapi.naver.com/v1/search/news.json"
#     headers = {
#         "X-Naver-Client-Id": NAVER_CLIENT_ID,
#         "X-Naver-Client-Secret": NAVER_CLIENT_SECRET
#     }
#     params = {"query": keyword, "display": max_count, "sort": "date"}
#     res = requests.get(url, headers=headers, params=params)
#     if res.status_code != 200:
#         return []
#     return [{
#         "title": item["title"],
#         "description": item["description"],
#         "link": item["link"]
#     } for item in res.json().get("items", [])]

# # ✅ 감성 분석 (FinBERT)
# def analyze_sentiment(texts: list) -> list:
#     results = []
#     for text in texts:
#         inputs = tokenizer(text, return_tensors="pt", truncation=True, max_length=512)
#         with torch.no_grad():
#             logits = model(**inputs).logits
#             probs = torch.nn.functional.softmax(logits, dim=1)[0]
#             label = torch.argmax(probs).item()
#             sentiment = ["Negative", "Neutral", "Positive"][label]
#         results.append(sentiment)
#     return results

# # ✅ GPT 요약 (기업 개요 기반)
# def gpt_summary(profile: dict, investor_type: str):
#     guide = {
#         "안정형": "장기적 재무 안정성과 배당 관점에서 분석해주세요.",
#         "공격형": "단기 고수익 또는 고성장 관점에서 분석해주세요.",
#         "융합형": "수익성과 안정성 사이 균형에 대해 분석해주세요."
#     }
#     prompt = f"""
# 다음은 한 기업의 개요입니다. 산업 특징, 주요 사업영역, 규모, R&D 투자, 리스크 등을 요약하고,
# '{investor_type}' 투자자에게 적합한 전략을 제시하세요.

# [기업 개요]
# - 기업명: {profile.get("기업명")}
# - 대표자명: {profile.get("대표자명")}
# - 업종코드: {profile.get("업종코드")}
# - 상장여부: {profile.get("상장여부")}
# - 설립일자: {profile.get("설립일자")}
# - 주소: {profile.get("주소")}
# - 지주회사: {profile.get("지주회사") or '없음'}

# [투자자 유형: {investor_type}]
# {guide[investor_type]}
# """
#     response = client.chat.completions.create(
#         model="gpt-4",
#         messages=[
#             {"role": "system", "content": "당신은 금융 전문가입니다."},
#             {"role": "user", "content": prompt}
#         ],
#         temperature=0.3
#     )
#     return response.choices[0].message.content.strip()

# # ✅ GPT 뉴스 요약

# def summarize_news_articles(news_items: list) -> str:
#     if not news_items:
#         return "관련 뉴스가 없거나 요약할 수 없습니다."

#     sentiments = analyze_sentiment([item["description"] for item in news_items])
#     joined = "\n".join(
#         f"- {item['title']} ({sentiment})\n  {item['link']}"
#         for item, sentiment in zip(news_items, sentiments)
#     )

#     prompt = f"""
# 다음은 특정 기업과 관련된 최근 뉴스 제목, 링크, 감성 분석 결과입니다.
# 이 기업의 투자 관점에서 핵심 뉴스 흐름과 긍·부정 시사점을 요약해 주세요.

# [뉴스 목록]
# {joined}
# """
#     response = client.chat.completions.create(
#         model="gpt-4",
#         messages=[
#             {"role": "system", "content": "당신은 금융 분석가입니다."},
#             {"role": "user", "content": prompt}
#         ],
#         temperature=0.3
#     )
#     return response.choices[0].message.content.strip()

# # ✅ 저장 함수 (요약, JSON, 마크다운)
# def save_reports(profile: dict, summary: str, news_items: list = None):
#     os.makedirs("summaries", exist_ok=True)
#     os.makedirs("reports", exist_ok=True)
#     base = profile["기업명"].replace("/", "_")

#       # ✅ 요약 텍스트 파일 저장 (뉴스 리스트도 포함)
#     with open(f"summaries/{base}_요약.txt", "w", encoding="utf-8") as f:
#         f.write(summary)
#         if news_items:
#             f.write("\n\n## 📰 뉴스 목록 및 감성 분석\n")
#             for item in news_items:
#                 f.write(f"- {item['title']} ({item.get('sentiment', 'Unknown')})\n  {item['link']}\n")

#     with open(f"summaries/react_items_{base}.json", "w", encoding="utf-8") as f:
#         json.dump({
#             "name": profile.get("기업명"),
#             "src": "https://res.cloudinary.com/zuzu-homepage/image/upload/v1739446680/p4rn9qxymke0lda94pzk.jpg",
#             "itemList": [
#                 {"type": "text", "data": [summary]},
#                 {"type": "text", "data": [profile.get("상장여부")]},
#                 {"type": "text", "data": ["정보 없음"]},
#                 {"type": "text", "data": ["정보 없음"]},
#                 {"type": "tag", "data": ["산업", "기술", "서비스"]},
#                 {"type": "tag", "data": ["성장성", "시장지배력"]}
#             ]
#         }, f, ensure_ascii=False, indent=2)

#     with open(f"reports/{base}_상세보고서.md", "w", encoding="utf-8") as f:
#         f.write(f"# \U0001f4c4 {profile['기업명']} 상세 보고서\n\n")
#         f.write("## \U0001f3e2 기업 개요\n")
#         for key, value in profile.items():
#             f.write(f"- **{key}**: {value or '정보 없음'}\n")
#         f.write("\n## \U0001f4d8 기업 상세\n")
#         f.write(summary)

# # ✅ 메인 실행 함수

# def generate_report(keyword: str, investor_type: str = "융합형") -> dict:
#     corp_df = load_corp_list(DART_API_KEY)
#     matches = find_corp_by_keyword(corp_df, keyword)
#     if matches.empty:
#         raise ValueError("❌ 해당 키워드를 포함한 기업이 없습니다.")

#     row = matches.iloc[0]
#     profile = collect_company_profile(row["corp_code"], DART_API_KEY)

#     news_items = fetch_news_articles(keyword)
#     news_summary = summarize_news_articles(news_items)

#     summary = ""
#     if profile:
#         summary = gpt_summary(profile, investor_type)
#     summary += f"\n\n## \U0001f4f0 관련 뉴스 요약 (감성 분석 포함)\n{news_summary}"

#     save_reports(profile or {"기업명": keyword}, summary, news_items=news_items)

#     corp_name = profile.get("기업명") if profile else keyword
#     return {
#         "corp_name": corp_name,
#         "summary_path": f"summaries/{corp_name.replace('/', '_')}_요약.txt",
#         "json_path": f"summaries/react_items_{corp_name.replace('/', '_')}.json",
#         "md_path": f"reports/{corp_name.replace('/', '_')}_상세보고서.md",
#         "news_items": news_items  # 딕셔너리화 목적 포함 (링크 + 감성 가능)
#     }

# # ✅ CLI or Colab 실행용
# if __name__ == "__main__":
#     keyword = input("\U0001f50d 검색할 기업 키워드 입력: ").strip()
#     investor_type = input("\U0001f464 투자자 유형 선택 (안정형 / 공격형 / 융합형): ").strip()
#     if investor_type not in ["안정형", "공격형", "융합형"]:
#         print("❌ 투자자 유형은 '안정형', '공격형', '융합형' 중 하나여야 합니다.")
#     else:
#         result = generate_report(keyword, investor_type)
#         print("\n✅ 보고서 생성 완료!")
#         print(json.dumps(result, ensure_ascii=False, indent=2))
