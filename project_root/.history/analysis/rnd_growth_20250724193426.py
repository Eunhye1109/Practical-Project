# analysis/rnd_growth.py

"""
[지표명] R&D 투자 증감률 (연구개발비 성장률)
[사용 컬럼]
- 연구개발비, R&D비용 등 유사 컬럼 추출 필요

[공식]
성장률 (%) = ((당기 R&D - 전기 R&D) / 전기 R&D) * 100
"""

import pandas as pd
from utils.parser import normalize_amount
from utils.column_tools import safe_match_column

def calculate_rnd_growth(data_by_year: dict[int, pd.DataFrame], matcher, threshold: float = 0.7) -> dict[int, float | None]:
    result = {}
    years = sorted(data_by_year.keys())

    for i in range(1, len(years)):
        prev_year, curr_year = years[i - 1], years[i]
        prev_df, curr_df = data_by_year[prev_year], data_by_year[curr_year]

        prev_col = safe_match_column(prev_df, matcher, "연구개발비", threshold=threshold)
        curr_col = safe_match_column(curr_df, matcher, "연구개발비", threshold=threshold)

        if not prev_col or not curr_col:
            print(f"[⚠️] {curr_year} R&D 컬럼 매칭 실패 → 계산 생략")
            result[curr_year] = None
            continue

        prev_val = normalize_amount(prev_df.loc[prev_col, "amount"])
        curr_val = normalize_amount(curr_df.loc[curr_col, "amount"])

        if prev_val is None or curr_val is None or prev_val == 0:
            result[curr_year] = None
        else:
            growth = (curr_val - prev_val) / prev_val * 100
            result[curr_year] = round(growth, 2)

    return result
