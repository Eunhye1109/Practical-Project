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

def calculate_liquidity_ratio(corp_code: str, year: int) -> float | None:
    """주어진 기업 코드와 연도에 대해 유동비율을 계산합니다."""
    data = fetch_financial_data(corp_code, year)
    if not data or "list" not in data:
        return None

    current_assets = None
    current_liabilities = None

    for item in data["list"]:
        name = item.get("account_nm", "")
        val = parse_amount(item.get("thstrm_amount"))

        if "유동자산" in name and current_assets is None:
            current_assets = val
        elif "유동부채" in name and current_liabilities is None:
            current_liabilities = val

    if current_assets and current_liabilities and current_liabilities != 0:
        return round((current_assets / current_liabilities) * 100, 2)

    return None
