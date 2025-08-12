# --- 캐논키 유틸 START ---
def _clean_num(x):
    if x is None: 
        return None
    s = str(x).strip()
    if s in ("-", ""):
        return None
    s = s.replace(",", "").replace("%", "").replace("원", "")
    try:
        f = float(s)
        return int(f) if f.is_integer() else f
    except Exception:
        return None

def _pick_pref(map_, base_key):
    # 보통주 우선 → 없으면 우선주
    for suff in ("|보통주", "|우선주"):
        v = _clean_num(map_.get(f"{base_key}{suff}"))
        if v is not None:
            return v
    return None

def _build_dividend_canon(year_map: dict) -> dict:
    out = {}
    out["주당 현금배당금(원)"] = _pick_pref(year_map, "주당 현금배당금(원)")
    out["현금배당수익률(%)"]   = _pick_pref(year_map, "현금배당수익률(%)")
    out["주식배당수익률(%)"]   = _pick_pref(year_map, "주식배당수익률(%)")
    v = _clean_num(year_map.get("(연결)현금배당성향(%)"))
    if v is None:
        v = _clean_num(year_map.get("현금배당성향(%)"))
    if v is not None:
        out["(연결)현금배당성향(%)"] = v
    return out
# --- 캐논키 유틸 END ---
