from chatbot.gpt_service import detect_crisis

def check_user_message_for_crisis(user_message: str) -> bool:
    """
    사용자의 메시지를 받아서 정서적 위기 여부를 판단하는 함수.
    내부적으로 detect_crisis를 호출한다.
    위기 상황이면 True, 아니면 False를 반환한다.
    """
    is_crisis = detect_crisis(user_message)
    return is_crisis