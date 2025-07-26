# utils/column_tools.py

"""
[목적] 컬럼 매칭 및 금액 파싱 유틸 함수 모음
"""

from typing import Optional
import pandas as pd
from utils.parser import normalize_amount


def match_column(df: pd.DataFrame, matcher, target: str, min_score: float = 0.75) -> Optional[str]:
    """
    [설명] 대상 문자열(target)에 대해 유사도 기반 컬럼 매칭을 수행
    - 유사도가 min_score 이상일 경우에만 컬럼명을 반환
    """
    candidates = list(df.index)
    matched, score = matcher.match(target, candidates=candidates, return_score=True)

    if matched in df.index and score >= min_score:
        print(f"[\U0001F50D] '{target}' → '{matched}' (score: {score:.4f})")
        return matched
    print(f"[⚠️] '{target}' 유사도 {score:.2f} → 기준 미달로 매칭 실패")
    return None


def safe_extract_amount(df: pd.DataFrame, col: str) -> Optional[float]:
    """
    [설명] 컬럼값에서 금액을 안전하게 추출 후 normalize하여 반환
    """
    try:
        raw = df.loc[col, "amount"]
        return normalize_amount(raw)
    except Exception:
        print(f"[❌] 금액 파싱 실패: '{col}'")
        return None
