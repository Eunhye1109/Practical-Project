# 부채비율 계산 함수

# analysis/debt_ratio.py

"""
[지표명] 부채비율 (Debt Ratio)
[사용 컬럼]
- 총부채 (부채총계)
- 자본총계

[공식]
부채비율 (%) = (총부채 / 자본총계) * 100
"""

from utils.api import fetch_financial_data
from utils.parser import parse_amount

def calculate_debt_ratio(df, matcher) -> float:
    """
    부채비율 = 부채총계 / 자본총계 * 100
    """
    try:
        liabilities = float(matcher.match("부채총계", candidates=list(df.index)))
        equity = float(matcher.match("자본총계", candidates=list(df.index)))
        if equity == 0:
            return None
        return round(liabilities / equity * 100, 2)
    except (ValueError, TypeError):
        return None

