# 매출 성장률 등 기타 항목

# analysis/growth_metrics.py

"""
[지표명] 매출 성장률 (Sales Growth Rate)
[사용 컬럼]
- 매출액 (당기, 전기)

[공식]
성장률 (%) = ((당기 매출 - 전기 매출) / 전기 매출) * 100
"""

import pandas as pd
from utils.api import fetch_financial_data
from utils.parser import parse_amount, normalize_amount

# analysis/growth_metrics.py

def safe_match_column(df: pd.DataFrame, matcher, target: str) -> str | None:
    """df.index에서 target 컬럼명을 안전하게 매칭"""
    candidates = list(df.index)
    matched = matcher.match(target, candidates=candidates, verbose=False)
    if matched in df.index:
        return matched
    print(f"[❌] 매칭된 컬럼 '{matched}'이(가) 존재하지 않음 (→ {target})")
    return None


def calculate_sales_growth(data_by_year: dict[int, pd.DataFrame], matcher) -> dict[int, float | None]:
    """
    매출 성장률 계산 (성장률[%] = ((당기-전기)/전기)*100)
    """
    result = {}
    years = sorted(data_by_year.keys())

    for i in range(1, len(years)):
        prev_year, curr_year = years[i - 1], years[i]
        prev_df, curr_df = data_by_year[prev_year], data_by_year[curr_year]

        prev_col = safe_match_column(prev_df, matcher, "매출액")
        curr_col = safe_match_column(curr_df, matcher, "매출액")

        if not prev_col or not curr_col:
            print(f"[⚠️] {curr_year} 매출액 컬럼 매칭 실패로 성장률 계산 불가")
            result[curr_year] = None
            continue

        prev_sales = parse_amount_safe(prev_df, prev_col)
        curr_sales = parse_amount_safe(curr_df, curr_col)

        if prev_sales is None or curr_sales is None:
            print(f"[⚠️] {curr_year} 매출 데이터 누락으로 성장률 계산 불가")
            result[curr_year] = None
            continue

        if prev_sales == 0:
            print(f"[⚠️] {curr_year} 전기 매출이 0 → 성장률 계산 불가")
            result[curr_year] = None
            continue

        growth = (curr_sales - prev_sales) / prev_sales * 100
        result[curr_year] = round(growth, 2)

    return result
