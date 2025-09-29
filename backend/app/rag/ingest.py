# file: backend/app/rag/ingest.py
from __future__ import annotations
from typing import List, Dict, Any, Iterable, Tuple, Set
from pathlib import Path
import os, json, re, hashlib

from .vector import VectorDB
from openai import OpenAI  # v1 client

# =========================
# ENV 로드 & OpenAI 클라이언트
# =========================
# ✅ .env 로드 (backend/.env 우선)
try:
    from dotenv import load_dotenv  # type: ignore
    ENV_PATH = Path(__file__).resolve().parents[2] / ".env"  # backend/.env
    if ENV_PATH.exists():
        load_dotenv(ENV_PATH)
    else:
        load_dotenv()
except Exception:
    pass

# ✅ API 키 필수 확인 & 클라이언트 생성
api_key = os.getenv("OPENAI_API_KEY")
if not api_key:
    raise RuntimeError("OPENAI_API_KEY is not set. Put it in backend/.env or set env var.")
client = OpenAI(api_key=api_key)

# ✅ 임베딩/모델 기본값 (v1 권장)
EMBED_MODEL = os.getenv("EMBED_MODEL", "text-embedding-3-small")

# =========================
# 경로/컬렉션/옵션
# =========================
DATA_DIR = Path(__file__).resolve().parents[2] / "data" / "raw"
COLLECTION = "corpus_emotion"
INGEST_LIMIT = int(os.getenv("INGEST_LIMIT", "0"))  # 0이면 전체

# 추출 힌트 키
TEXT_KEY_HINTS: Set[str] = {
    "utterance","utter","text","content","message","sentence",
    "dialog","dialogue","system_text","user_text","assistant_text",
    "qas","q","a"
}
SKIP_KEY_HINTS: Set[str] = {"id","idx","index","time","timestamp","date","label_id"}
HANGUL_RE = re.compile(r"[가-힣]")

# =========================
# 디버그
# =========================
def debug_data_dir() -> None:
    print(f"[DEBUG] DATA_DIR = {DATA_DIR}")
    if not DATA_DIR.exists():
        print("[DEBUG] DATA_DIR does not exist.")
        return
    files = list(DATA_DIR.glob("*.json")) + list(DATA_DIR.glob("*.jsonl"))
    if not files:
        print("[DEBUG] No *.json or *.jsonl files in data/raw")
    for p in files:
        print(f"[DEBUG] found file: {p.name} ({p.stat().st_size} bytes)")

# =========================
# 추출 로직
# =========================
def looks_like_utterance(s: str) -> bool:
    if not isinstance(s, str):
        return False
    s = s.strip()
    if len(s) < 2 or len(s) > 800:
        return False
    if HANGUL_RE.search(s):
        return True
    return len(s.split()) >= 3

def key_priority(k: str) -> int:
    kl = k.lower()
    if kl in TEXT_KEY_HINTS:
        return 0
    if kl in SKIP_KEY_HINTS:
        return 100
    for hint in TEXT_KEY_HINTS:
        if hint in kl:
            return 1
    return 10

def extract_texts(obj: Any, base_meta: Dict[str, Any]) -> List[Tuple[str, Dict[str,Any]]]:
    out: List[Tuple[str, Dict[str,Any]]] = []
    if isinstance(obj, str):
        if looks_like_utterance(obj):
            out.append((obj.strip(), dict(base_meta)))
        return out

    if isinstance(obj, list):
        for i, v in enumerate(obj):
            meta = dict(base_meta)
            meta.setdefault("idx", i)
            out.extend(extract_texts(v, meta))
        return out

    if isinstance(obj, dict):
        lab = None
        for lk in ("label","emotion","sentiment","category"):
            if lk in obj and isinstance(obj[lk], str):
                lab = obj[lk]
                break
        keys_sorted = sorted(obj.keys(), key=lambda k: key_priority(k))
        for k in keys_sorted:
            v = obj[k]
            kl = k.lower()
            if kl in SKIP_KEY_HINTS:
                continue
            meta = dict(base_meta)
            meta.setdefault("key", kl)
            if lab is not None:
                meta["label"] = lab

            if isinstance(v, str):
                if key_priority(kl) <= 10 and looks_like_utterance(v):
                    out.append((v.strip(), meta))
                continue

            out.extend(extract_texts(v, meta))
        return out

    return out

# =========================
# 파일 로딩
# =========================
def _iter_jsonl(fp: Path) -> Iterable[Any]:
    with fp.open("r", encoding="utf-8") as f:
        for ln, line in enumerate(f, 1):
            line = line.strip()
            if not line:
                continue
            try:
                yield json.loads(line)
            except Exception as e:
                print(f"[WARN] JSONL parse error at {fp.name}:{ln}: {e}")

def _load_file(fp: Path) -> List[Dict[str, Any]]:
    rows: List[Dict[str, Any]] = []
    try:
        iterable = list(_iter_jsonl(fp)) if fp.suffix.lower() == ".jsonl" else json.loads(fp.read_text(encoding="utf-8"))
        if not isinstance(iterable, list):
            iterable = [iterable]

        cnt_raw = len(iterable)
        extracted = 0

        for idx, item in enumerate(iterable):
            base_meta = {"src": fp.name, "idx": idx}
            pairs = extract_texts(item, base_meta)
            for text, meta in pairs:
                rows.append({"text": text, "meta": meta})
            extracted += len(pairs)

        print(f"[INFO] parsed {fp.name}: raw_items={cnt_raw}, extracted={extracted}")
    except Exception as e:
        print(f"[WARN] skip {fp.name}: {e}")
    return rows

def _load_corpus() -> List[Dict[str, Any]]:
    print(f"[INFO] scanning data dir: {DATA_DIR}")
    if not DATA_DIR.exists():
        print("[WARN] data dir not found.")
        return []

    files = list(DATA_DIR.glob("*.json")) + list(DATA_DIR.glob("*.jsonl"))
    if not files:
        print("[WARN] no json/jsonl files found in data/raw")
        return []

    all_rows: List[Dict[str, Any]] = []
    for fp in files:
        all_rows.extend(_load_file(fp))

    # 중복 제거(텍스트 기준)
    seen: Set[str] = set()
    uniq_rows: List[Dict[str, Any]] = []
    for r in all_rows:
        t = r["text"]
        if t in seen:
            continue
        seen.add(t)
        uniq_rows.append(r)

    print(f"[INFO] total extracted rows (dedup): {len(uniq_rows)}")

    if INGEST_LIMIT > 0:
        print(f"[INFO] INGEST_LIMIT={INGEST_LIMIT} → first {INGEST_LIMIT} rows will be embedded")
        uniq_rows = uniq_rows[:INGEST_LIMIT]

    return uniq_rows

# =========================
# 임베딩
# =========================
def _embed_batch(texts: List[str], batch_size: int = 200) -> List[List[float]]:
    embs: List[List[float]] = []
    total = len(texts)
    for i in range(0, total, batch_size):
        chunk = texts[i:i+batch_size]
        resp = client.embeddings.create(model=EMBED_MODEL, input=chunk)
        embs.extend([d.embedding for d in resp.data])
        print(f"[INFO] embedded {i+len(chunk)}/{total}")
    return embs

# =========================
# ID 생성 (중복 방지)
# =========================
# ✅ 해시 기반 ID 생성: 동일 텍스트는 동일 해시 → 업서트 안정
def _make_id(src: str, text: str) -> str:
    h = hashlib.blake2b(text.encode("utf-8"), digest_size=8).hexdigest()
    return f"{src}-{h}"

# =========================
# 엔트리 포인트
# =========================
def ingest_corpus_emotion() -> int:
    rows = _load_corpus()
    if not rows:
        print("[INFO] no rows to ingest")
        return 0

    texts = [r["text"] for r in rows]
    metas = [r["meta"] for r in rows]

    # ✅ ID 생성부 교체: src + text 해시
    ids = [_make_id(m.get("src", "?"), texts[i]) for i, m in enumerate(metas)]

    # (안전) 혹시라도 중복이 남아있다면 enumerate로 보정
    if len(ids) != len(set(ids)):
        print("[WARN] duplicate IDs detected after hashing; falling back to enumerated IDs.")
        ids = [f'{m.get("src","?")}-{i}' for i, m in enumerate(metas)]

    print(f"[INFO] embedding {len(texts)} items...")
    embs = _embed_batch(texts)

    vdb = VectorDB()
    vdb.upsert_texts(COLLECTION, ids, texts, metas, embs)
    print(f"[INFO] upserted {len(texts)} items into '{COLLECTION}'")

    return len(texts)

if __name__ == "__main__":
    debug_data_dir()
    ingest_corpus_emotion()
