# 🔹 기업명 → 컬럼 수집 API (GET /fetch)

from fastapi import APIRouter, Query
from service.fetch_data import fetch_corp_data

router = APIRouter()

@router.get("/fetch")
async def fetch_columns(corp_name: str = Query(..., description="기업명")):
    return fetch_corp_data(corp_name)
