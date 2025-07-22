# 영업이익률

# analysis/operating_margin.py

"""
[지표명] 영업이익률 (Operating Profit Margin)
[사용 컬럼]
- 영업이익
- 매출액 (또는 수익)

[공식]
영업이익률 (%) = (영업이익 / 매출액) * 100
"""

from utils.api import fetch_financial_data
from utils.parser import parse_amount

def calculate_operating_margin(corp_code: str, year: int) -> float | None:
    """주어진 기업 코드와 연도에 대해 영업이익률을 계산합니다."""
    data = fetch_financial_data(corp_code, year)
    if not data or "list" not in data:
        return None

    operating_income = None
    revenue = None

    for item in data["list"]:
        name = item.get("account_nm", "")
        val = parse_amount(item.get("thstrm_amount"))

        if "영업이익" in name and operating_income is None:
            operating_income = val
        elif ("매출액" in name or "수익" in name or "매출" in name) and revenue is None:
            revenue = val

    if operating_income and revenue and revenue != 0:
        return round((operating_income / revenue) * 100, 2)

    return None
