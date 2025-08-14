# service/fetch_gpt_prompt.py
from prompts.gpt_prompts import (
    gpt_summary_finbert,
    _format_fin_snapshot,    # ← 추가
    _format_news_brief,      # ← 추가
)
from service.fetch_data import fetch_corp_data   # ← 추가
from utils.api_util import collect_profile
from utils.config import tokenizer, model
import torch.nn.functional as F
from dto.ai_summary import AiSummaryRequest, AiSummaryResponse


def analyze_ai_summary(request: AiSummaryRequest):
    try:
        # 1) 프로필 수집 (타임아웃 필요: collect_profile 내부에 추가 권장)
        profile = collect_profile(request.corpCode)

        # 2) 그래프/뉴스 확보: 요청 > 보충(fetch_corp_data) > 없으면 None
        graph_data = request.graphData
        news_data = request.newsData
        if graph_data is None or news_data is None:
            try:
                fetched = fetch_corp_data(request.corpCode)
                if graph_data is None:
                    graph_data = fetched.get("graphData") or fetched.get("columns")  # 호환
                if news_data is None:
                    news_data = fetched.get("newsData")
            except Exception as _:
                pass

        fin_block = _format_fin_snapshot(graph_data)
        news_block = _format_news_brief(news_data)

        # 3) GPT 3문장 요약 (정량+뉴스 반영), 감정은 후속 FinBERT
        three_line_summary = gpt_summary_finbert(
            profile=profile,
            user_purpose=request.userPurpose,
            fin_snapshot=_format_fin_snapshot(graph_data),
            news_brief=_format_news_brief(news_data)
        ) or ""

        # 4) FinBERT로 감정 라벨
        seed_text = three_line_summary.strip() or "기업 정보가 제한적입니다."
        inputs = tokenizer(seed_text, return_tensors="pt", truncation=True)
        outputs = model(**inputs)
        probs = F.softmax(outputs.logits, dim=1)
        label_id = int(probs.argmax().item())
        labels = ["부정", "중립", "긍정"]
        emotion = labels[label_id]

        return [AiSummaryResponse(emotion=emotion, summary=three_line_summary)]

    except Exception as e:
        print(f"[AI SUMMARY] fail: {e}")
        return [AiSummaryResponse(emotion="중립", summary="요약 생성을 일시적으로 실패했습니다.")]