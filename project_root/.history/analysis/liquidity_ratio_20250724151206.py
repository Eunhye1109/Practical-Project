# 유동비율 계산 함수

# analysis/liquidity_ratio.py

"""
[지표명] 유동비율 (Liquidity Ratio)
[사용 컬럼]
- 유동자산
- 유동부채

[공식]
유동비율 (%) = (유동자산 / 유동부채) * 100
"""

from utils.api import fetch_financial_data
from utils.parser import parse_amount

def calculate_liquidity_ratio(df, matcher) -> float:
    """
    유동비율 = 유동자산 / 유동부채 * 100
    """
    try:
        current_assets = float(matcher.match("유동자산"))
        current_liabilities = float(matcher.match("유동부채"))
        if current_liabilities == 0:
            return None
        return round(current_assets / current_liabilities * 100, 2)
    except (ValueError, TypeError):
        return None
