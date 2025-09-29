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
        return self.client.get_or_create_collection(name=name, metadata={"hnsw:space": "cosine"})
    def upsert_texts(self, collection: str, ids: List[str], texts: List[str], metadatas: List[Dict[str, Any]], embeddings: List[List[float]]):
        self.get(collection).upsert(ids=ids, documents=texts, metadatas=metadatas, embeddings=embeddings)
    def query(self, collection: str, query_embeddings: List[List[float]], top_k: int = 4) -> List[Dict[str, Any]]:
        res = self.get(collection).query(query_embeddings=query_embeddings, n_results=top_k, include=["documents","metadatas","distances"])
        docs = res.get("documents", [[]])[0]
        metas = res.get("metadatas", [[]])[0]
        dists = res.get("distances", [[]])[0]
        return [{"text": d, "meta": m, "score": 1 - dist} for d, m, dist in zip(docs, metas, dists)]
