from __future__ import annotations
from typing import List, Dict, Any
from pathlib import Path
import chromadb
from chromadb.config import Settings

class VectorDB:
    def __init__(self, persist_dir: str = ".chroma"):
        Path(persist_dir).mkdir(exist_ok=True)
        self.client = chromadb.PersistentClient(path=persist_dir, settings=Settings())

    def get(self, name: str):
        # cosine 거리
        return self.client.get_or_create_collection(
            name=name,
            metadata={"hnsw:space": "cosine"},
        )

    def upsert_texts(
        self,
        collection: str,
        ids: List[str],
        texts: List[str],
        metadatas: List[Dict[str, Any]],
        embeddings: List[List[float]],
    ):
        # 단일 호출 (소량일 때 사용)
        col = self.get(collection)
        col.upsert(ids=ids, documents=texts, metadatas=metadatas, embeddings=embeddings)

    def upsert_texts_batched(
        self,
        collection: str,
        ids: List[str],
        texts: List[str],
        metadatas: List[Dict[str, Any]],
        embeddings: List[List[float]],
        batch_size: int = 2000,  # Chroma 제한(≈5461) 이하로 안전하게
    ):
        col = self.get(collection)
        n = len(ids)
        for i in range(0, n, batch_size):
            j = i + batch_size
            col.upsert(
                ids=ids[i:j],
                documents=texts[i:j],
                metadatas=metadatas[i:j],
                embeddings=embeddings[i:j],
            )
            print(f"[INFO] upserted {min(j, n)}/{n} to '{collection}'")
