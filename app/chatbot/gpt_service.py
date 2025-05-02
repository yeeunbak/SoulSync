import openai
import os
from dotenv import load_dotenv
from chatbot.prompt_templates import get_prompt

# .env 파일의 환경변수를 불러오기
load_dotenv()

# 환경변수에서 OpenAI API 키 가져오기
openai.api_key = os.getenv("OPENAI_API_KEY")

def generate_reply(user_message: str, character_choice: str) -> str:
    """
    사용자의 입력 메시지와 선택한 캐릭터를 바탕으로 GPT에게 답변을 생성하도록 요청하는 함수.
    """
    prompt = get_prompt(character_choice)

    response = openai.ChatCompletion.create(
        model="gpt-4o",
        messages=[
            {"role": "system", "content": prompt},
            {"role": "user", "content": user_message}
        ],
        temperature=0.7,
        max_tokens=500,
    )

    reply = response['choices'][0]['message']['content'].strip()
    return reply

def detect_crisis(user_message: str) -> bool:
    """
    사용자의 입력 메시지를 비밀스럽게 GPT에게 보내어
    정서적 위기 상황인지 판단하는 함수. (Yes/No로만 답변 받음)
    """
    crisis_detection_prompt = (
        "당신은 사용자의 심리적 위기 여부를 평가하는 시스템입니다.\n"
        "다음 발화가 심각한 우울, 극단적 충동, 무력감 등 위험 신호를 나타내는지 판단하세요.\n"
        "반드시 'Yes' 또는 'No'로만 답변하세요.\n\n"
        f"사용자 발화: {user_message}\n\n"
        "응답:"
    )

    response = openai.ChatCompletion.create(
        model="gpt-4o",
        messages=[
            {"role": "system", "content": "당신은 정서적 위기 감지 평가자입니다."},
            {"role": "user", "content": crisis_detection_prompt}
        ],
        temperature=0,
        max_tokens=10,
    )

    answer = response['choices'][0]['message']['content'].strip().lower()

    if 'yes' in answer:
        return True
    else:
        return False