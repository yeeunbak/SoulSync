from fastapi import APIRouter, HTTPException
from app.schemas.diagnosis import PHQ9Input

router = APIRouter()

# 점수를 진단 결과로 해석하는 함수
def interpret_phq9(score: int) -> str:
    if score <= 4:
        return "우울증 없음 또는 최소"
    elif score <= 9:
        return "가벼운 우울증"
    elif score <= 14:
        return "중등도 우울증"
    elif score <= 19:
        return "중등도에서 심한 우울증"
    else:
        return "심한 우울증"

# 라우터 함수
@router.post("/phq9")
def process_phq9(data: PHQ9Input):
    if len(data.answers) != 9:
        raise HTTPException(status_code=400, detail="PHQ-9 requires exactly 9 answers.")
    
    total_score = sum(data.answers)
    diagnosis = interpret_phq9(total_score)
    return {"diagnosis": diagnosis}