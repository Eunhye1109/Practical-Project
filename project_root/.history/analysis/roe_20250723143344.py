# ROE 계산 함수

## 1. ROE란 무엇일까요

#ROE(자기자본이익률)는 1년간 벌어들인 당기순이익을 자본총계로 나누어 계산합니다.

#여기서 당기순이익은 기업이 각종 비용을 뺀 최종적으로 벌어들인 돈이며, 자본총계는 자산에서 부채를 제외한 것으로 주주의 몫입니다.

#즉, ROE는 주주의 돈으로 얼만큼의 이익을 냈는지 알 수 있는 지표입니다.

# analysis/roe.py

"""
[지표명] ROE (자기자본이익률)
[사용 컬럼]
- 당기순이익 (순이익)
- 자본총계

[공식]
ROE (%) = (당기순이익 / 자본총계) * 100
"""

from utils.api import fetch_financial_data
from utils.parser import parse_amount

def calculate_roe(data: dict) -> float:
    """
    자기자본이익률 (ROE: Return on Equity)
    = 당기순이익 / 평균 자본 * 100

    ※ 평균 자본이 없으면 자본총계 기준으로 근사 계산
    """
    try:
        net_income = float(data.get("당기순이익", 0))
        equity = float(data.get("자본총계", 0))
        if equity == 0:
            return None
        return round(net_income / equity * 100, 2)
    except (ValueError, TypeError):
        return None

# def calculate_roe(corp_code: str, year: int) -> float | None:
#     """주어진 기업 코드와 연도에 대해 ROE를 계산합니다."""
#     data = fetch_financial_data(corp_code, year)
#     if not data or "list" not in data:
#         return None

#     net_income = None
#     equity = None

#     for item in data.get("list", []):
#         name = item.get("account_nm", "")
#         val = parse_amount(item.get("thstrm_amount"))
#         print(f"  → {name}: {val}")  # 디버깅용 출력

#         if "순이익" in name and net_income is None:
#             net_income = val
#         elif ("자본총계" in name or "총자본" in name) and equity is None:
#             equity = val

#     if net_income and equity and equity != 0:
#         return round((net_income / equity) * 100, 2)

#     return None

