# 파이어베이스 SDK 초기화
# 서버 측에서 SDK를 통해 파이어베이스 사용 가능

import firebase_admin
from firebase_admin import credentials
import os

# 파이어베이스 SDK 초기화 함수
def initialize_firebase_admin():
    if not firebase_admin._apps: # 파이어베이스가 아직 초기화되지 않았다면
        cred_path = os.path.join(os.path.dirname(__file__), "serviceAccountKey.json")
        cred = credentials.Certificate(cred_path)
        firebase_admin.initialize_app(cred) # 파이어베이스 SDK 초기화