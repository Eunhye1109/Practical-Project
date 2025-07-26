# utils/column_tools.py

import pandas as pd
from utils.parser import normalize_amount

def safe_match_column(df: pd.DataFrame, matcher, target: str, threshold: float = 0.7) -> str | None:
    """df.index에서 target 컬럼명을 안전하게 매칭"""
    candidates = list(df.index)
    matched = matcher.match(target, candidates=candidates, verbose=False)
    # --- 반환값이 list면, 첫 번째 원소만 사용하도록 보정 ---
    if isinstance(matched, list):
        if not matched:
            return None
        matched = matched[0]
    # 유사도 기준 검사는 matcher 내부에서 수행되고, 기준 미달이면 None 반환됨
    if matched in df.index:
        return matched

    print(f"[❌] 매칭된 컬럼 '{matched}'이(가) 존재하지 않음 (→ {target})")
    return None


def parse_amount_safe(df: pd.DataFrame, col: str) -> float | None:
    """금액 파싱 시 예외 처리 포함한 안전 버전"""
    try:
        value = df.loc[col, "amount"]
        return normalize_amount(value)
    except (KeyError, ValueError, TypeError):
        print(f"[❌] 금액 파싱 실패: 컬럼='{col}', 존재여부={col in df.index}")
        return None
