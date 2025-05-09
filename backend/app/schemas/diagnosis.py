from pydantic import BaseModel
from typing import List

class PHQ9Input(BaseModel):
    answers: List[int]  # 길이 9짜리 리스트여야 함