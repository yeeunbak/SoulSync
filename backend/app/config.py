from pydantic import BaseSettings
from functools import lru_cache

class Settings(BaseSettings):
    firebase_cert_path: str = "firebase-service-account.json"
    database_url: str = "sqlite:///./soulsync.db"
    env: str = "development"

    class Config:
        env_file = ".env"

@lru_cache()
def get_settings():
    return Settings()

settings = get_settings()
