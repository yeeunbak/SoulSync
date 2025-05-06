# FastAPI 서버에서 파이어베이스 인증 토큰 검증 및 검증된 사용자 정보 반환

from fastapi import Request, HTTPException, status, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from firebase_admin import auth
from .firebase_admin_init import initialize_firebase_admin

# 파이어베이스 SDK 초기화
initialize_firebase_admin()

security = HTTPBearer()

# 사용자를 검증하고 사용자의 정보를 가져오는 함수
async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    try:
        token = credentials.credentials
        decoded_token = auth.verify_id_token(token) # 토큰 검증 후 사용자 정보 반환
        return decoded_token
    except Exception: # 토큰이 없거나 유효하지 않은 경우 에러 발생
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials",
        )