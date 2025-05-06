# /models/risk_analysis.py
from pydantic import BaseModel

class RiskAnalysis(BaseModel):
    user_id: str
    message: str
    is_high_risk: bool
    risk_reason: str  # "자살 언급", "분노 표현" 등
