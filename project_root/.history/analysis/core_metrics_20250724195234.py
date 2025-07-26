# 여기는 낱개 컬럼들을 모으는 .py 파일 입니다.

# core_metrics.py

from utils.parser import normalize_amount
from utils.column_matcher import ColumnMatcher
from utils.column_tools import match_column, safe_extract_amount
import pandas as pd

def extract_single_value(df, matcher, target_name, threshold=0.75):
    """
    특정 항목의 값을 안전하게 추출
    예: '총매출', '영업이익', '자기자본' 등
    """
    matched = match_column(df, matcher, target_name, threshold=threshold)
    if not matched:
        return None
    return safe_extract_amount(df, matched)

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


def extract_total_revenue(df: pd.DataFrame, matcher: ColumnMatcher) -> float | None:
    return extract_metric_value(df, matcher, "총매출")


def extract_net_income(df: pd.DataFrame, matcher: ColumnMatcher) -> float | None:
    return extract_metric_value(df, matcher, "당기순이익")


def extract_equity(df: pd.DataFrame, matcher: ColumnMatcher) -> float | None:
    return extract_metric_value(df, matcher, "자본총계")
