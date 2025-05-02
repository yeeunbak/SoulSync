from pydantic import BaseModel

class RiskAnalysisResponse(BaseModel):
    is_high_risk: bool
    reason: str
