# similar_listed_router.py
from fastapi import APIRouter, Query, HTTPException
from typing import Any, Dict
from utils.similar_core import TOP100  # TOP100 내부 사용

router = APIRouter(prefix="/similar-listed", tags=["SimilarListed"])

@router.get("/ui", summary="유사 상장사 TopK (UI shape)")
def similar_listed_ui(company: str = Query(..., min_length=1), topk: int = Query(3, ge=1, le=10)) -> Dict[str, Any]:
    try:
        ranked = TOP100(company, topk)
        ui = [{
            "corpName": r["name"],
            "logo": "",  # ← 로고는 Boot에서 DB 조인으로 채움
            "probability": f"{r['similarity']}%",
            "basis": r["reason"]
        } for r in ranked]
        return {"similarCorp": ui}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"similar-listed-ui fail: {e}")
