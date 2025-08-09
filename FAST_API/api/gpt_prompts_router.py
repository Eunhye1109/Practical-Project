# router/gpt_router.py
from fastapi import APIRouter
from dto.ai_summary import AiSummaryRequest, AiSummaryResponse
from service.fetch_gpt_prompt import analyze_ai_summary
from typing import List

router = APIRouter(
    prefix="/api/gpt",
    tags=["AI 감성 요약"]
)

@router.post("/summary", response_model=List[AiSummaryResponse])
def summarize_with_sentiment(request: AiSummaryRequest):
    return analyze_ai_summary(request)
