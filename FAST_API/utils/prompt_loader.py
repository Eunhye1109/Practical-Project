# utils/prompt_loader.py

import os

def load_prompt(filename: str) -> str:
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    prompt_path = os.path.join(base_dir, filename)
    print(f"📁 절대경로 확인: {prompt_path}")


    if not os.path.exists(prompt_path):
        print(f"[경고] 프롬프트 파일 없음: {prompt_path}")
        return "GPT 요약 실패: 프롬프트 파일 없음."

    with open(prompt_path, "r", encoding="utf-8") as f:
        return f.read()
