
# dto/ai_summary.py
from pydantic import BaseModel

class AiSummaryRequest(BaseModel):
    corpCode: str
    userPurpose: str = "안정형"

class AiSummaryResponse(BaseModel):
    emotion: str
    summary: str
