# 🔹 API 키, 기준값 등 설정

from dotenv import load_dotenv
from openai import OpenAI
from prompts.prompt_loader import load_prompt
import os

load_dotenv(dotenv_path="Keys.env")

# API KEY 관련
DARTAPI_KEY = os.getenv("DARTAPI_KEY")

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

LOGO_CACHE_PATH = os.getenv("summaries/logo_cache.json")

LOGO_API_TOKEN = os.getenv("pk_bVmwf0tgQT2enb3JOCA5Ig")


# 프롬프트 관련
SUMMARY_PROMPT_TEMPLATE = load_prompt("prompts/gpt_summary_prompt.txt")


# 설정 관련
SIM_THRESHOLD = 0.8
YEARS = ["2024", "2023", "2022"]
REPRT_CODE=11011
DEFAULT_YEAR = "2023"
MAX_COMPANY_COUNT = 2 # 응답 제한

# GPT 모델 관련
client = OpenAI(api_key=OPENAI_API_KEY)
OPENAI_MODEL = "gpt-4o"
DEFAULT_TEMPERATURE = 0.5



