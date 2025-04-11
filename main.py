from fastapi import FastAPI
from app.routers import auth, user, chat, emotion, alert
from app.config import settings

app = FastAPI(
    title="SoulSync Backend",
    description="SoulSync 백엔드",
    version="1.0.0"
)

app.include_router(auth.router, prefix="/auth", tags=["Auth"])
app.include_router(user.router, prefix="/user", tags=["User"])
app.include_router(chat.router, prefix="/chat", tags=["Chat"])
app.include_router(emotion.router, prefix="/emotion", tags=["Emotion"])
app.include_router(alert.router, prefix="/alert", tags=["Alert"])
