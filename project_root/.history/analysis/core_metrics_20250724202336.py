# 여기는 낱개 컬럼들을 모으는 .py 파일 입니다.

# core_metrics.py

from utils.parser import normalize_amount
from utils.column_matcher import ColumnMatcher
from utils.column_tools import safe_match_column, parse_amount_safe
import pandas as pd

def extract_metric_value(df: pd.DataFrame, matcher: ColumnMatcher, target_name: str, min_similarity=0.75) -> float | None:
    """
    공통 추출 로직 (유사도 기반 매칭)
    """
    candidates = list(df.index)
    matched, score = matcher.match_with_score(target_name, candidates=candidates)

    if matched is None or score < min_similarity:
        print(f"[⚠️] '{target_name}' 유사도 {score:.2f} → 기준 미달로 매칭 실패")
        return None

    try:
        raw_value = df.loc[matched, "amount"]
        return normalize_amount(raw_value)
    except Exception as e:
        print(f"[❌] '{target_name}' 값 추출 실패: {e}")
        return None


def extract_total_revenue(df: pd.DataFrame, matcher) -> float | None:
    col = safe_match_column(df, matcher, "총매출")
    return parse_amount_safe(df, col) if col else None


def extract_net_income(df: pd.DataFrame, matcher) -> float | None:
    col = safe_match_column(df, matcher, "순이익")
    return parse_amount_safe(df, col) if col else None


def extract_equity(df: pd.DataFrame, matcher) -> float | None:
    col = safe_match_column(df, matcher, "자기자본")
    return parse_amount_safe(df, col) if col else None


def extract_single_value(df: pd.DataFrame, matcher, keyword: str) -> float | None:
    col = safe_match_column(df, matcher, keyword)
    return parse_amount_safe(df, col) if col else None
