from fastapi import APIRouter, Depends, HTTPException
from app.schemas.chat import ChatRequest, ChatResponse, EmotionScore
from app.chatbot.analyze_emotion import analyze_emotion
from app.chatbot.character_response import generate_character_prompt
from app.crud.chat import save_chat, get_user_chats  # ✅ 추가된 부분
from app.models.chat import ChatDBModel
from app.db.mongo import get_database
import openai

router = APIRouter(prefix="/chat", tags=["Chat"])

@router.post("/", response_model=ChatResponse)
async def chat_with_bot(
    chat_input: ChatRequest,
    db = Depends(get_database)
):
    try:
        # 1. 감정 분석
        emotion_score = analyze_emotion(chat_input.message)

        # 2. 캐릭터 프롬프트 생성
        base_prompt = generate_character_prompt(chat_input.character, chat_input.message)
        messages = [{"role": "system", "content": base_prompt}]

        # 3. 이전 대화 불러오기 (최근 5개)
        past_chats = await get_user_chats(db, chat_input.user_id, limit=5)
        for chat in reversed(past_chats):  # 최신 순 정렬
            messages.append({"role": "user", "content": chat["user_message"]})
            messages.append({"role": "assistant", "content": chat["bot_reply"]})

        # 4. 현재 메시지 추가
        messages.append({"role": "user", "content": chat_input.message})

        # 5. GPT 호출
        completion = openai.ChatCompletion.create(
            model="gpt-4o",
            messages=messages,
            temperature=0.7
        )
        bot_reply = completion["choices"][0]["message"]["content"].strip()

        # 6. DB 저장
        chat_record = ChatDBModel(
            user_id=chat_input.user_id,
            character=chat_input.character,
            user_message=chat_input.message,
            bot_reply=bot_reply,
            emotion_score=emotion_score
        )
        await save_chat(db, chat_record)

        # 7. 응답
        response = {
            "reply": bot_reply,
            "emotion_score": emotion_score if chat_input.show_emotion_score else None
        }
        return response

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))