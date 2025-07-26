# 여기는 낱개 컬럼들을 모으는 .py 파일 입니다.

# analysis/core_metrics.py

def extract_single_value(df, matcher, target_name: str) -> float | None:
    col = matcher.match(target_name, candidates=list(df.index))
    if col not in df.index:
        print(f"[❌] '{target_name}' 매칭 실패")
        return None
    try:
        val = df.loc[col, "amount"]
        return float(str(val).replace(",", "").strip())
    except:
        print(f"[❌] '{col}' 파싱 실패")
        return None
