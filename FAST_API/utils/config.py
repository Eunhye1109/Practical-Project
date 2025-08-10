# 🔹 API 키, 기준값 등 설정

from dotenv import load_dotenv
from openai import OpenAI
from transformers import AutoTokenizer, AutoModelForSequenceClassification
import os

load_dotenv(dotenv_path="Keys.env")

# API KEY 관련
DARTAPI_KEY = os.getenv("DARTAPI_KEY")

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

LOGO_CACHE_PATH = os.getenv("LOGO_CACHE_PATHn")

LOGO_API_TOKEN = os.getenv("LOGO_API_TOKEN")

NAVER_CLIENT_ID = os.getenv("NAVER_CLIENT_ID")

NAVER_CLIENT_SECRET = os.getenv("NAVER_CLIENT_SECRET")



# 설정 관련
SIM_THRESHOLD = 0.8
YEARS = ["2024", "2023", "2022"]
DEFAULT_YEAR = "2023"
MAX_COMPANY_COUNT = 2 # 응답 제한

# DART
REPRT_CODE=11011
FS_DIV_OPTIONS = ["CFS", "OFS", "UFS"]


# GPT 모델 관련
CLIENT = OpenAI(api_key=OPENAI_API_KEY)
OPENAI_MODEL = "gpt-4o"
DEFAULT_TEMPERATURE = 0.5



# ✅ FinBERT 로드
tokenizer = AutoTokenizer.from_pretrained("ProsusAI/finbert")
model = AutoModelForSequenceClassification.from_pretrained("ProsusAI/finbert")