# 🔹 API 키, 기준값 등 설정

from dotenv import load_dotenv
import os

load_dotenv(dotenv_path="Key.env")

API_KEY = os.getenv("API_KEY")
SIM_THRESHOLD = 0.8
YEARS = ["2024", "2023", "2022"]
REPRT_CODE=11011

DEFAULT_YEAR = "2023"

# GPT 모델 관련
OPENAI_MODEL = "gpt-4o-mini"
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
DEFAULT_TEMPERATURE = 0.5

# 응답 제한
MAX_COMPANY_COUNT = 2