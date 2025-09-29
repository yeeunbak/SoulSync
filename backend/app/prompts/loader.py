from pathlib import Path
from typing import Dict

PROMPTS_DIR = Path(__file__).parent

_FILE_MAP = {
    "empathic": "character_empathic.jinja",
    "insightful": "character_insightful.jinja",
    "pragmatic": "character_pragmatic.jinja",
    "trauma_sensitive": "character_trauma_sensitive.jinja",
}

def load_template(character: str) -> str:
    name = _FILE_MAP.get(character, _FILE_MAP["empathic"])
    path = PROMPTS_DIR / name
    return path.read_text(encoding="utf-8")

def render(character: str, *, context: str, user_message: str, gauge: Dict[str, int], dialogue_summary: str = "") -> str:
    tpl = load_template(character)
    # 아주 단순한 치환 (Jinja2 없이 동작)
    out = tpl
    out = out.replace("{{context}}", context)
    out = out.replace("{{user_message}}", user_message)
    out = out.replace("{{dialogue_summary}}", dialogue_summary)
    out = out.replace("{{gauge.depression}}", str(gauge.get("depression", 0)))
    out = out.replace("{{gauge.anxiety}}", str(gauge.get("anxiety", 0)))
    out = out.replace("{{gauge.lethargy}}", str(gauge.get("lethargy", 0)))
    return out
