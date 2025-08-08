
# dto/ai_summary.py
from pydantic import BaseModel

class AiSummaryRequest(BaseModel):
    corpCode: str
    userPurpose: str

class AiSummaryResponse(BaseModel):
    emotion: str
    sumary: str
