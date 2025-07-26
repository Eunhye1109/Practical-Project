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

# analysis/growth_metrics.py

def calculate_sales_growth(data_by_year: df, matcher) -> dict:
    """
    연도별 매출 성장률 계산
    growth[2022] = (2022매출 - 2021매출) / 2021매출 * 100
    """
    result = {}
    years = sorted(data_by_year.keys())
    sales_key = matcher.match("매출액")

    for i in range(1, len(years)):
        prev_year, curr_year = years[i-1], years[i]
        prev_data = data_by_year.get(prev_year, {})
        curr_data = data_by_year.get(curr_year, {})

        try:
            prev_sales = float(prev_data.get(sales_key, 0))
            curr_sales = float(curr_data.get(sales_key, 0))
            if prev_sales == 0:
                result[curr_year] = None
            else:
                growth = (curr_sales - prev_sales) / prev_sales * 100
                result[curr_year] = round(growth, 2)
        except (ValueError, TypeError):
            result[curr_year] = None

    return result

