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

def get_sales(corp_code: str, year: int) -> int | None:
    """특정 연도의 매출액을 반환합니다."""
    data = fetch_financial_data(corp_code, year)
    if not data or "list" not in data:
        return None

    for item in data["list"]:
        name = item.get("account_nm", "")
        val = parse_amount(item.get("thstrm_amount"))

        if ("매출액" in name or "수익" in name or "매출" in name):
            return val

    return None

def calculate_sales_growth(corp_code: str, year: int) -> float | None:
    """전년도 대비 해당 연도의 매출 성장률을 계산합니다."""
    current_sales = get_sales(corp_code, year)
    prev_sales = get_sales(corp_code, year - 1)

    if current_sales and prev_sales and prev_sales != 0:
        return round(((current_sales - prev_sales) / prev_sales) * 100, 2)

    return None
