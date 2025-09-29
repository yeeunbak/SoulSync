from __future__ import annotations
from typing import Dict, Any
import os
from openai import OpenAI
from .retriever import retrieve_context
from ..prompts.loader import render
from ..chatbot.emotion_lc import analyze_emotion_lc

client = OpenAI()
CHAT_MODEL = os.getenv("CHAT_MODEL", "gpt-4o")

def _compute_gauge(prev: Dict[str,int] | None, msg: Dict[str,int], diag: Dict[str,int] | None) -> Dict[str,int]:
    a, b, c = 0.5, 0.3, 0.2
    keys = ("depression","anxiety","lethargy")
    return {k: round(a*msg.get(k,0) + b*(diag or {}).get(k,0) + c*(prev or {}).get(k,0)) for k in keys}

async def rag_chat(user_id: str, character: str, user_message: str) -> Dict[str, Any]:
    ctx_docs = retrieve_context(user_id, user_message, top_k=4)
    ctx_text = "\n".join(f"- {d['text']}" for d in ctx_docs)
    msg_emotion = analyze_emotion_lc(user_message)
    gauge = _compute_gauge(prev=None, msg=msg_emotion, diag=None)
    system_prompt = render(character, context=ctx_text, gauge=gauge)
    messages = [
        {"role":"system","content":system_prompt},
        {"role":"user","content":user_message},
    ]
    resp = client.chat.completions.create(model=CHAT_MODEL, messages=messages, temperature=0.7)
    reply = resp.choices[0].message.content or ""
    return {"reply": reply, "emotion_score": msg_emotion, "gauge": gauge, "used_context": [d["text"] for d in ctx_docs]}
