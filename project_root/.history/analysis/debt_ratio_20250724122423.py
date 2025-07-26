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

def calculate_debt_ratio(data: dict, matcher) -> float:
    """
    부채비율 = 부채총계 / 자본총계 * 100
    """
    try:
        liabilities = float(data.get("부채총계", 0))
        equity = float(data.get("자본총계", 0))
        if equity == 0:
            return None
        return round(liabilities / equity * 100, 2)
    except (ValueError, TypeError):
        return None

# def calculate_debt_ratio(corp_code: str, year: int) -> float | None:
#     """주어진 기업 코드와 연도에 대해 부채비율을 계산합니다."""
#     data = fetch_financial_data(corp_code, year)
#     if not data or "list" not in data:
#         return None

#     total_liabilities = None
#     equity = None

#     for item in data["list"]:
#         name = item.get("account_nm", "")
#         val = parse_amount(item.get("thstrm_amount"))

#         if ("부채총계" in name or "총부채" in name) and total_liabilities is None:
#             total_liabilities = val
#         elif ("자본총계" in name or "총자본" in name) and equity is None:
#             equity = val

#     if total_liabilities and equity and equity != 0:
#         return round((total_liabilities / equity) * 100, 2)

#     return None
