# 🔹 FastAPI 진입점 (라우터 등록)

from fastapi import FastAPI, Request
from api import fetch_router, embed_router, search_list_router, gpt_prompts_router, news_router
import time

app = FastAPI()

@app.middleware("http")
async def timing(request: Request, call_next):
    start = time.perf_counter()
    try:
        response = await call_next(request)
        return response
    finally:
        dur = int((time.perf_counter() - start) * 1000)
        print(f"[{request.method}] {request.url.path} {dur}ms")

app.include_router(fetch_router.router)
app.include_router(embed_router.router)
app.include_router(search_list_router.router)
app.include_router(gpt_prompts_router.router)
app.include_router(news_router.router)