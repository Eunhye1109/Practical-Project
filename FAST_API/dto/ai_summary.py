
# dto/ai_summary.py
from pydantic import BaseModel
from typing import List, Optional, Dict, Any

class AiSummaryRequest(BaseModel):
    corpCode: str
    userPurpose: str = "안정형"
    graphData: Optional[List[Dict[str, Any]]] = None
    newsData: Optional[List[Dict[str, Any]]] = None

class AiSummaryResponse(BaseModel):
    emotion: str
    summary: str
