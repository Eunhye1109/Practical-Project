# fetch_data.py 상단 import 근처에 유틸 추가
def _clean_num(x):
    if x is None:
        return None
    s = str(x).strip()
    if s == "-" or s == "":
        return None
    s = s.replace(",", "").replace("%", "").replace("원", "")
    try:
        # 정수처럼 보이면 int로, 아니면 float
        f = float(s)
        return int(f) if f.is_integer() else f
    except Exception:
        return None

def _pick_pref(map_, base_key):
    # 보통주 우선, 없으면 우선주 대체
    for suff in ("|보통주", "|우선주"):
        v = map_.get(f"{base_key}{suff}")
        v = _clean_num(v)
        if v is not None:
            return v
    return None

def _build_dividend_canon(year_map: dict) -> dict:
    out = {}
    # 1) 주당 현금배당금(원)
    out["주당 현금배당금(원)"] = _pick_pref(year_map, "주당 현금배당금(원)")

    # 2) 현금배당수익률(%)
    out["현금배당수익률(%)"] = _pick_pref(year_map, "현금배당수익률(%)")

    # 3) 주식배당수익률(%)
    out["주식배당수익률(%)"] = _pick_pref(year_map, "주식배당수익률(%)")

    # 4) (연결)현금배당성향(%)
    v = year_map.get("(연결)현금배당성향(%)")
    v = _clean_num(v)
    if v is None:
        v = _clean_num(year_map.get("현금배당성향(%)"))
    if v is not None:
        out["(연결)현금배당성향(%)"] = v

    return out
