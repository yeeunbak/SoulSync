# rag_chain.py
import os
import chromadb
from langchain_openai import ChatOpenAI
from langchain.prompts import ChatPromptTemplate

OPENAI_CHAT_MODEL = os.getenv("OPENAI_CHAT_MODEL","gpt-4o-mini")
CHROMA_DIR = os.getenv("CHROMA_DIR","./.chroma")

class RAGResponder:
    def __init__(self):
        self.llm = ChatOpenAI(model=OPENAI_CHAT_MODEL, temperature=0.4)
        self.client = chromadb.PersistentClient(path=CHROMA_DIR)
        self.col_style = self.client.get_or_create_collection("counseling_style")

    def examples_for(self, emotion: str, k:int=3):
        q = self.col_style.query(query_texts=[emotion], n_results=k)
        docs = q.get("documents",[[]])[0]
        return "\n".join([f"- {d}" for d in docs])

    def generate(self, user_utts: str, emo_scores: dict, gauge: float, persona: str="베이맥스"):
        dominant = max(emo_scores, key=emo_scores.get)
        ex = self.examples_for(dominant, k=3)

        sys = (
          "You are a **supportive counseling assistant**, not a doctor. "
          "Use empathic, validating language first, then offer one practical, low-effort next step. "
          "If self-harm risk is suspected, provide crisis resources and suggest contacting local helplines."
        )
        tmpl = ChatPromptTemplate.from_messages([
          ("system", sys),
          ("user",
           """[Persona: {persona}]
[Dominant emotion: {dom} | Gauge: {gauge:.1f}/100]
[Emotion probs: {probs}]
[User said]: {text}
[Style examples for {dom}]:
{examples}

Write a concise, warm reply (2~5 sentences max). Use persona style subtly.
""")
        ])
        msg = tmpl.format_messages(
            persona=persona, dom=dominant, gauge=gauge,
            probs=emo_scores, text=user_utts, examples=ex
        )
        return self.llm.invoke(msg).content
