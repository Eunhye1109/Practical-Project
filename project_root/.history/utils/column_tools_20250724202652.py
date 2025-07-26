# utils/column_tools.py

import pandas as pd
from utils.parser import normalize_amount

def safe_match_column(df: pd.DataFrame, matcher, target: str, threshold: float = 0.7) -> str | None:
    """df.index에서 target 컬럼명을 안전하게 매칭"""
    candidates = list(df.index)
    matched, score = matcher.match(target, candidates=candidates, return_score=True)

    if matched in df.index and score >= threshold:
        return matched

    print(f"[❌] 매칭된 컬럼 '{matched}'이(가) 존재하지 않거나 유사도({score:.2f}) 기준({threshold}) 미달")
    return None

def parse_amount_safe(df: pd.DataFrame, col: str) -> float | None:
    """금액 파싱 시 예외 처리 포함한 안전 버전"""
    try:
        value = df.loc[col, "amount"]
        return normalize_amount(value)
    except (KeyError, ValueError, TypeError):
        print(f"[❌] 금액 파싱 실패: 컬럼='{col}', 존재여부={col in df.index}")
        return None
