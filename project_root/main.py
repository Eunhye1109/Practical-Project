# 메인 실행 진입점

# main.py

"""
[사용법]
단일 기업명을 입력하면 지정된 지표 분석 결과를 출력합니다.
- 분석 항목: ROE, 부채비율, 유동비율, 영업이익률, 매출 성장률
- 추후 plot/csv 저장 등 확장 가능
"""

import argparse
from config import YEARS
from utils.api import get_corp_code_dict

from analysis.roe import calculate_roe
from analysis.debt_ratio import calculate_debt_ratio
from analysis.liquidity_ratio import calculate_liquidity_ratio
from analysis.operating_margin import calculate_operating_margin
from analysis.growth_metrics import calculate_sales_growth

print("🚨 프로그램 시작됨", flush=True)


def run_full_analysis(corp_name: str):

    print("📌 get_corp_code_dict() 실행됨", flush=True)

    corp_code_dict = get_corp_code_dict()

    # 디버깅
    print("등록된 기업명 예시 (상위 10개):")
    for name in list(corp_code_dict.keys())[:10]:
        print(" -", name)
        
    corp_code = corp_code_dict.get(corp_name)
    print(f"기업코드 확인: {corp_name} → {corp_code}")


    if not corp_code:
        print(f"❌ 기업 코드 없음: {corp_name}")
        return

    print(f"\n📊 {corp_name} 재무 지표 분석 결과\n{'-'*40}")
    for year in YEARS:
        roe = calculate_roe(corp_code, year)
        debt = calculate_debt_ratio(corp_code, year)
        liquid = calculate_liquidity_ratio(corp_code, year)
        op_margin = calculate_operating_margin(corp_code, year)
        growth = calculate_sales_growth(corp_code, year)

        print(f"[{year}]")
        print(f"  ROE: {roe}%")
        print(f"  부채비율: {debt}%")
        print(f"  유동비율: {liquid}%")
        print(f"  영업이익률: {op_margin}%")
        print(f"  매출성장률: {growth}%\n")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="기업명 기반 재무분석 도구")
    parser.add_argument("corp", type=str, required=True, help="분석할 기업명 (예: 삼성전자)")
    args = parser.parse_args()

    run_full_analysis(args.corp)