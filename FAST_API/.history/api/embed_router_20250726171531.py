# 🔹 컬럼 → 임베딩 매핑 API (POST /embed)

from fastapi import APIRouter, Body
from service.embedding_service import get_best_matches

router = APIRouter()

@router.post("/embed")
async def embed_columns(payload: dict = Body(...)):
    candidate_cols = payload.get("candidate_cols", [])
    return get_best_matches(target_cols, candidate_cols)
