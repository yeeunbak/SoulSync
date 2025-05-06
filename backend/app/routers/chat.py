from fastapi import APIRouter, Depends, HTTPException
from app.schemas.chat import ChatRequest, ChatResponse, EmotionScore
from chatbot.analyze_emotion import analyze_emotion
from chatbot.character_response import generate_character_prompt
from crud.chat import save_chat
from models.chat import ChatDBModel
from db.mongo import get_database
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

        # 2. 캐릭터 스타일 프롬프트 생성
        prompt = generate_character_prompt(chat_input.character, chat_input.message)

        # 3. GPT 호출
        completion = openai.ChatCompletion.create(
            model="gpt-4o",
            messages=[{"role": "user", "content": prompt}],
            temperature=0.7
        )
        bot_reply = completion["choices"][0]["message"]["content"].strip()

        # 4. DB 저장
        chat_record = ChatDBModel(
            user_id=chat_input.user_id,
            character=chat_input.character,
            user_message=chat_input.message,
            bot_reply=bot_reply,
            emotion_score=emotion_score
        )
        await save_chat(db, chat_record)

        # 5. 응답
        response = {
            "reply": bot_reply,
            "emotion_score": emotion_score if chat_input.show_emotion_score else None
        }
        return response

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
