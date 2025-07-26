# 매출 성장률 등 기타 항목

# analysis/growth_metrics.py

"""
[지표명] 매출 성장률 (Sales Growth Rate)
[사용 컬럼]
- 매출액 (당기, 전기)

[공식]
성장률 (%) = ((당기 매출 - 전기 매출) / 전기 매출) * 100
"""

from utils.api import fetch_financial_data
from utils.parser import parse_amount
import pandas as pd

# analysis/growth_metrics.py

def calculate_sales_growth(data_by_year: dict[int, pd.DataFrame], matcher) -> dict:
    """
    연도별 매출 성장률 계산
    growth[2022] = (2022매출 - 2021매출) / 2021매출 * 100
    """
    result = {}
    years = sorted(data_by_year.keys())

    # 첫 번째 연도는 기준이 없으므로 skip
    for i in range(1, len(years)):
        prev_year = years[i - 1]
        curr_year = years[i]

        prev_df = data_by_year[prev_year]
        curr_df = data_by_year[curr_year]

        try:
            sales_key_prev = matcher.match("매출액", candidates=list(prev_df.index))
            sales_key_curr = matcher.match("매출액", candidates=list(curr_df.index))

            prev_sales = float(prev_df.loc[sales_key_prev, "amount"])
            curr_sales = float(curr_df.loc[sales_key_curr, "amount"])

            if prev_sales == 0:
                result[curr_year] = None
            else:
                growth = (curr_sales - prev_sales) / prev_sales * 100
                result[curr_year] = round(growth, 2)
        except Exception as e:
            print(f"[⚠️] {curr_year} 성장률 계산 오류: {e}")
            result[curr_year] = None

    return result
