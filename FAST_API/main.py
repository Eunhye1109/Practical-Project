# 🔹 FastAPI 진입점 (라우터 등록)

from fastapi import FastAPI
from api import fetch_router, embed_router, search_list_router

app = FastAPI()

app.include_router(fetch_router.router)
app.include_router(embed_router.router)
app.include_router(search_list_router.router)