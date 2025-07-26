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


def calculate_roe(df, matcher):
    equity_col = matcher.match("자본총계", candidates=list(df.index))
    net_income_col = matcher.match("당기순이익(손실)", candidates=list(df.index))

    if equity_col not in df.index or net_income_col not in df.index:
        return None
    
    equity = df.loc[equity_col, "amount"]
    net_income = df.loc[net_income_col, "amount"]
    
    if equity == 0:
        return None
    
    roe = net_income / equity * 100
    return round(roe, 2)

