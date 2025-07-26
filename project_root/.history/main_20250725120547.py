# 메인 실행 진입점

# main.py

"""
[사용법]
단일 기업명을 입력하면 지정된 지표 분석 결과를 출력합니다.
- 분석 항목: ROE, 부채비율, 유동비율, 영업이익률, 매출 성장률
- 추후 plot/csv 저장 등 확장 가능
"""

import argparse
from config import YEARS, STANDARD_COLUMNS, MANUAL_MAP
from utils.api import get_corp_code_dict, fetch_all_yearly_data
from utils.column_matcher import ColumnMatcher

from analysis.roe import calculate_roe
from analysis.debt_ratio import calculate_debt_ratio
from analysis.liquidity_ratio import calculate_liquidity_ratio
from analysis.operating_margin import calculate_operating_margin
from analysis.growth_metrics import calculate_sales_growth
from analysis.core_metrics import extract_total_revenue, extract_single_value, extract_net_income, extract_equity
from analysis.rnd_growth import calculate_rnd_growth

# 시작 알림
print("🚨 프로그램 시작됨", flush=True)

print("macher 초기화🚨 프로그램 시작됨", flush=True)


# mapped_col = matcher.match("총자본")


def run_full_analysis(corp_name: str):

    columns_printed = False  # ✅ 한 번만 출력하도록 설정

    print("📌 get_corp_code_dict() 실행됨", flush=True)
    corp_code_dict = get_corp_code_dict()

    print("등록된 기업명 예시 (상위 10개):")
    for name in list(corp_code_dict.keys())[:10]:
        print(" -", name)
        
    corp_code = corp_code_dict.get(corp_name)
    print(f"기업코드 확인: {corp_name} → {corp_code}")
    if not corp_code:
        print(f"❌ 기업 코드 없음: {corp_name}")
        return

    
     # ✅ 1. 연도별 전체 재무데이터 수집 (단 1회씩)
    data_by_year = fetch_all_yearly_data(corp_code, YEARS)

    # ▶ 기업 단위로 raw 컬럼 한 번만 뽑아서 배치 매칭
    all_raw_cols = sorted({col for df in data_by_year.values() for col in df.index})
    matched_map = matcher.batch_match_columns(STANDARD_COLUMNS, all_raw_cols, corp_name)

    # ▶ matched_map: { "매출액": "수익(매출액)", "유동자산": "유동자산", ... }
    
    # ✅ 컬럼 매처 객체 초기화
    matcher = ColumnMatcher(STANDARD_COLUMNS, manual_map=MANUAL_MAP)
    
    # ✅ 성장률은 미리 계산 
    growth_dict = calculate_sales_growth(data_by_year, matcher)

    rnd_growth = calculate_rnd_growth(data_by_year, matcher)

    print(f"\n📊 {corp_name} 재무 지표 분석 결과\n{'-'*40}")

    # for year in YEARS:
    #     data = data_by_year.get(year, {})

    for year, df in data_by_year.items():
        if df.empty:
            print(f"[{year}] 데이터 없음")
            continue

        if not columns_printed:
            print("\n📌 전체 컬럼 목록 (1회 출력):")
            for col in df.index:
                print(col)
            columns_printed = True  # 출력 완료 플래그 설정

        roe = calculate_roe(df, matcher)
        debt = calculate_debt_ratio(df, matcher)
        liquid = calculate_liquidity_ratio(df, matcher)
        op_margin = calculate_operating_margin(df, matcher)

sales_key = matched_map.get("매출액")
        if sales_key:
            total_revenue = df.loc[sales_key, "amount"]
            print(f"  총매출: {total_revenue} 원")
            
        net_income = extract_net_income(df, matcher)
        if net_income is not None:
            print(f"  순이익: {net_income} 원")

        equity = extract_equity(df, matcher)
        if equity is not None:
            print(f"  자기자본: {equity} 원")

        if rnd_growth.get(year) is not None:
            print(f"  R&D 투자 증감률: {rnd_growth[year]}%")
        
        sales = extract_single_value(df, matcher, "총매출")
        if sales is not None:
            print(f"  총매출: {sales} 원")

        print(f"[{year}]")
        print(f"  총매출: {sales} 원")
        print(f"  순이익: {net_income} 원")
        print(f"  자기자본: {equity} 원")
        print(f"  R&D 투자 증감률: {rnd_growth.get(year)}%")
        print(f"  ROE: {roe}%")
        print(f"  부채비율: {debt}%")
        print(f"  유동비율: {liquid}%")
        print(f"  영업이익률: {op_margin}%")
        print(f"  매출성장률: {growth_dict.get(year)}%")
        growth = growth_dict.get(year)

        if growth is not None:
            print(f"  매출성장률 ({year}): {growth}%")

if __name__ == "__main__":
    # print(matcher.match("총부채"))       # ✅ 수동 매핑
    # print(matcher.match("자산총합"))     # 🧠 BERT 기반 매핑 예상
    parser = argparse.ArgumentParser(description="기업명 기반 재무분석 도구")
    parser.add_argument("corp", type=str, help="분석할 기업명 (예: 삼성전자)")
    args = parser.parse_args()

    run_full_analysis(args.corp)

