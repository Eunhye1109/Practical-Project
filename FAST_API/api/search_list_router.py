# api/search_list_router.py

from fastapi import APIRouter, Query
from fastapi.responses import JSONResponse
from service.search_list_service import search_list_summary

router = APIRouter()


@router.get("/api/search/list")
def searchlist(keyword: str = Query(..., description="검색할 기업명 키워드")):
    return search_list_summary(keyword)