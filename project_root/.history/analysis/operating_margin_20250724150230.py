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


def calculate_operating_margin(data: dict, matcher) -> float:
    """
    영업이익률 = 영업이익 / 매출액 * 100

    ※ 계정명 기준: '영업이익', '매출액'
    """
    try:
        operating_profit = float(matcher.match("영업이익"))
        revenue = float(matcher.match("매출액"))
        if revenue == 0:
            return None
        return round(operating_profit / revenue * 100, 2)
    except (ValueError, TypeError):
        return None
