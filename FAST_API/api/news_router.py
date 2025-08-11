from fastapi import APIRouter, Query
from typing import Optional
from service.fetch_data import fetch_news_articles

router = APIRouter()

@router.get("/news")
async def fetch_news(
    keyword: str = Query(..., description="검색 키워드"),
    max_count: Optional[int] = Query(3, description="최대 뉴스 개수")
):
    return fetch_news_articles(keyword, max_count)
