from pydantic import BaseModel

class AnalyzeRequest(BaseModel):
    message: str

class AnalyzeResponse(BaseModel):
    우울: int
    불안: int
    무기력: int