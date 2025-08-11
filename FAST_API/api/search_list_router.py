# api/search_list_router.py

from fastapi import APIRouter, Query
from typing import Optional
from service.search_list_service import search_list_summary

router = APIRouter()


@router.get("/api/search/list")
def searchlist(keyword: str = Query(..., description="검색할 기업명 키워드"),
    user_purpose: Optional[str] = Query(None, description="사용자 유형")):
    return search_list_summary(keyword, user_purpose)