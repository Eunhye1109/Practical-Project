# service/gpt_summary_service.py
from prompts.gpt_prompts import gpt_summary
from utils.api_util import collect_profile
from utils.config import tokenizer, model
import torch
import torch.nn.functional as F
from dto.ai_summary import AiSummaryRequest, AiSummaryResponse

def analyze_ai_summary(request: AiSummaryRequest):
    profile = collect_profile(request.corpCode)
    result = gpt_summary(profile, request.userPurpose)
    summary = result.get("한 문장 요약", "")

    # FinBERT 감성 분석
    inputs = tokenizer(summary, return_tensors="pt", truncation=True)
    outputs = model(**inputs)
    probs = F.softmax(outputs.logits, dim=1)
    label_id = torch.argmax(probs).item()
    labels = ["부정", "중립", "긍정"]

    emotion = labels[label_id]

    return [AiSummaryResponse(emotion=emotion, sumary=summary)]
