from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorDatabase
import os
from dotenv import load_dotenv

load_dotenv()  # .env 파일에서 환경 변수 로드

MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017")
DB_NAME = os.getenv("MONGO_DB", "soulsync")

client = AsyncIOMotorClient(MONGO_URI)

def get_database() -> AsyncIOMotorDatabase:
    return client[DB_NAME]
