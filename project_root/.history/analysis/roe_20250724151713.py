
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
    
    if equity == None:
        return None
    
    roe = net_income / equity * 100
    return round(roe, 2)

