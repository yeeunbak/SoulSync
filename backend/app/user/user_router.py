from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

router = APIRouter()

# 가짜 사용자 정보 (진짜 DB 대신 테스트용)
FAKE_USER_DB = {
    "testuser": "1234"  # 아이디: 비밀번호
}

# 요청 형식 정의
class UserLogin(BaseModel):
    username: str
    password: str

@router.post("/login")
def login(user: UserLogin):
    if user.username not in FAKE_USER_DB:
        raise HTTPException(status_code=401, detail="존재하지 않는 사용자입니다.")

    if FAKE_USER_DB[user.username] != user.password:
        raise HTTPException(status_code=401, detail="비밀번호가 올바르지 않습니다.")

    return {"message": "로그인 성공!", "username": user.username}