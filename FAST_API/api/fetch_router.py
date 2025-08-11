# 🔹 기업명 → 컬럼 수집 API (GET /fetch)

from fastapi import APIRouter, Query
from typing import Optional
from service.fetch_data import fetch_corp_data

router = APIRouter()

@router.get("/fetch")
async def fetch_columns(
    corp_code: str = Query(..., description="기업코드"),
    user_purpose: Optional[str] = Query(None, description="사용자 유형")):
    return fetch_corp_data(corp_code, user_purpose)
