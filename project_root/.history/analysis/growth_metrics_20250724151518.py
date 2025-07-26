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

def calculate_sales_growth(data_by_year: dict[int, pd.DataFrame], matcher) -> dict[int, float | None]:
    """
    연도별 매출 성장률 계산
    growth[2022] = (2022 매출 - 2021 매출) / 2021 매출 * 100
    """
    result = {}
    years = sorted(data_by_year.keys())
    
    # 기준 계정명 매핑 (후보 없음 → standard column 기준)
    sales_key = matcher.match("매출액")

    for i in range(1, len(years)):
        prev_year, curr_year = years[i - 1], years[i]
        prev_df = data_by_year.get(prev_year)
        curr_df = data_by_year.get(curr_year)

        if prev_df is None or curr_df is None:
            result[curr_year] = None
            continue

        try:
            # df에 존재하는 실제 컬럼명을 찾아야 함
            prev_sales_col = matcher.match("매출액", candidates=list(prev_df.index))
            curr_sales_col = matcher.match("매출액", candidates=list(curr_df.index))

            prev_sales = prev_df.loc[prev_sales_col, "amount"]
            curr_sales = curr_df.loc[curr_sales_col, "amount"]

            if prev_sales == 0:
                result[curr_year] = None
            else:
                growth = (curr_sales - prev_sales) / prev_sales * 100
                result[curr_year] = round(growth, 2)
        except Exception as e:
            print(f"[⚠️] {curr_year} 성장률 계산 오류:", e)
            result[curr_year] = None

    return result
