# service/fetch_gpt_prompt.py
from prompts.gpt_prompts import gpt_summary
from utils.api_util import collect_profile
from utils.config import tokenizer, model
import torch.nn.functional as F
from dto.ai_summary import AiSummaryRequest, AiSummaryResponse

def analyze_ai_summary(request: AiSummaryRequest):
    try:
        profile = collect_profile(request.corpCode)
        result = gpt_summary(profile, request.userPurpose)
        summary = result.get("한 문장 요약", "") or ""

        # FinBERT 감성 분석
        inputs = tokenizer(summary or "정보가 부족합니다.", return_tensors="pt", truncation=True)
        outputs = model(**inputs)
        probs = F.softmax(outputs.logits, dim=1)
        label_id = int(probs.argmax().item())
        labels = ["부정", "중립", "긍정"]
        emotion = labels[label_id]
        return [AiSummaryResponse(emotion=emotion, summary=summary)]
    except Exception as e:
        # ✅ 절대 500 내보내지 말고 중립으로 안전 반환
        print(f"[AI SUMMARY] fail: {e}")
        return [AiSummaryResponse(emotion="중립", summary="요약 생성을 일시적으로 실패했습니다.")]
