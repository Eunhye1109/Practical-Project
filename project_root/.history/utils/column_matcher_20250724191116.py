# utils/column_matcher.py
from sentence_transformers import SentenceTransformer, util
import torch
import json
import os

CACHE_PATH = os.path.join(os.path.dirname(__file__), "cache", "column_cache.json")

def load_column_cache():
    if not os.path.exists(CACHE_PATH):
        return {}
    with open(CACHE_PATH, "r", encoding="utf-8") as f:
        return json.load(f)

def save_column_cache(cache):
    with open(CACHE_PATH, "w", encoding="utf-8") as f:
        json.dump(cache, f, ensure_ascii=False, indent=2)

class ColumnMatcher:

    def __init__(self, standard_columns, manual_map=None):
        self.standard_columns = standard_columns
        self.manual_map = manual_map or {}
        self.column_cache = load_column_cache()

    def match(self, target, candidates, verbose=True):
    # ✅ 수동 매핑 우선
    if target in self.manual_map:
        mapped = self.manual_map[target]
        if mapped in candidates:
            if verbose:
                print(f"[🧠] 수동 매핑: '{target}' → '{mapped}'")
            return mapped

    # ✅ 캐시 기반 매핑 시도
    cached_candidates = self.column_cache.get(target, [])
    for cached in cached_candidates:
        if cached in candidates:
            if verbose:
                print(f"[⚡] 캐시된 매핑: '{target}' → '{cached}'")
            return cached

    # ✅ BERT 기반 유사도 매칭
    scores = [(col, self.similarity(target, col)) for col in candidates]
    scores.sort(key=lambda x: x[1], reverse=True)
    best_match, best_score = scores[0]

    if verbose:
        print(f"[🔍] '{target}' 유사도 Top 5:")
        for col, score in scores[:5]:
            print(f"    → {col} (유사도: {score:.4f})")

    # ✅ 유사도 기준치 적용 (예: 0.75 이상만 인정)
    if best_score < 0.75:
        if verbose:
            print(f"[❌] 유사도 {best_score:.4f} → 기준 미달, 매핑 실패")
        return None

    # ✅ 캐시에 누적 저장
    self.column_cache.setdefault(target, [])
    if best_match not in self.column_cache[target]:
        self.column_cache[target].append(best_match)
        save_column_cache(self.column_cache)
        if verbose:
            print(f"[💾] 캐시에 '{target}' → '{best_match}' 추가 저장됨")

    return best_match




