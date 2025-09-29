from __future__ import annotations
from fastapi import APIRouter, Depends, HTTPException
from app.schemas.chat import ChatRequest, ChatResponse
from app.chatbot.analyze_emotion import analyze_emotion
from app.chatbot.character_response import generate_character_prompt
from app.crud.chat import save_chat, get_user_chats
from app.models.chat import ChatDBModel
from app.db.mongo import get_database

from app.openai_client import client, CHAT_MODEL
from app.rag.service import rag_chat  # 위에 준 v1 RAG

router = APIRouter(prefix="/chat", tags=["Chat"])

@router.post("/", response_model=ChatResponse)
async def chat_with_bot(chat_input: ChatRequest, db = Depends(get_database)):
    try:
        mode = getattr(chat_input, "mode", "basic") or "basic"

        # 공통: 감정 점수
        emotion_score = analyze_emotion(chat_input.message)

        if mode == "rag":
            # ✅ RAG 경로
            rag_res = rag_chat(chat_input.user_id, chat_input.character, chat_input.message)
            bot_reply = rag_res["reply"]

        else:
            # ✅ 기본 경로 (과거 v0 → v1으로 교체)
            base_prompt = generate_character_prompt(chat_input.character, chat_input.message)
            messages = [{"role": "system", "content": base_prompt}]

            # 최근 대화 5개 히스토리
            past = await get_user_chats(db, chat_input.user_id, limit=5)
            for ch in reversed(past):
                messages.append({"role": "user", "content": ch["user_message"]})
                messages.append({"role": "assistant", "content": ch["bot_reply"]})

            messages.append({"role": "user", "content": chat_input.message})

            completion = client.chat.completions.create(
                model=CHAT_MODEL,
                messages=messages,
                temperature=0.7,
            )
            bot_reply = completion.choices[0].message.content.strip()

        # 저장
        chat_record = ChatDBModel(
            user_id=chat_input.user_id,
            character=chat_input.character,
            user_message=chat_input.message,
            bot_reply=bot_reply,
            emotion_score=emotion_score
        )
        await save_chat(db, chat_record)

        return {
            "reply": bot_reply,
            "emotion_score": emotion_score if chat_input.show_emotion_score else None
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
