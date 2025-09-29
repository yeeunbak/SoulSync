from fastapi import APIRouter, Depends, HTTPException
from app.schemas.chat import ChatRequest, ChatResponse
from app.chatbot.analyze_emotion import analyze_emotion  # 기존 함수가 있으면 유지
from app.chatbot.character_response import generate_character_prompt
from app.crud.chat import save_chat, get_user_chats
from app.models.chat import ChatDBModel
from app.db.mongo import get_database
from app.rag.service import rag_chat
from openai import OpenAI

client = OpenAI()
router = APIRouter(prefix="/chat", tags=["Chat"])

@router.post("/", response_model=ChatResponse)
async def chat_with_bot(chat_input: ChatRequest, db = Depends(get_database)):
    try:
        mode = getattr(chat_input, "mode", "basic") or "basic"

        # ===== RAG =====
        if mode == "rag":
            result = await rag_chat(chat_input.user_id, chat_input.character, chat_input.message)
            bot_reply = result["reply"]
            emotion_score = result.get("emotion_score")
            await save_chat(db, ChatDBModel(
                user_id=chat_input.user_id,
                character=chat_input.character,
                user_message=chat_input.message,
                bot_reply=bot_reply,
                emotion_score=emotion_score
            ))
            return {"reply": bot_reply, "emotion_score": emotion_score if chat_input.show_emotion_score else None}

        # ===== BASIC =====
        emotion_score = analyze_emotion(chat_input.message)
        base_prompt = generate_character_prompt(chat_input.character, chat_input.message)
        messages = [{"role": "system", "content": base_prompt}]

        past_chats = await get_user_chats(db, chat_input.user_id, limit=5)
        for chat in reversed(past_chats):
            messages.append({"role": "user", "content": chat["user_message"]})
            messages.append({"role": "assistant", "content": chat["bot_reply"]})

        messages.append({"role": "user", "content": chat_input.message})

        resp = client.chat.completions.create(model="gpt-4o", messages=messages, temperature=0.7)
        bot_reply = resp.choices[0].message.content or ""

        await save_chat(db, ChatDBModel(
            user_id=chat_input.user_id,
            character=chat_input.character,
            user_message=chat_input.message,
            bot_reply=bot_reply,
            emotion_score=emotion_score
        ))

        return {"reply": bot_reply, "emotion_score": emotion_score if chat_input.show_emotion_score else None}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
