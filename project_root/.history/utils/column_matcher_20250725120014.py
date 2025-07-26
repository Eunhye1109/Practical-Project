# utils/column_matcher.py
import json
import os
import torch
from sentence_transformers import SentenceTransformer, util

class ColumnMatcher:
    def __init__(self, standard_columns, manual_map=None, cache_path="column_cache.json", min_similarity=0.80):
        self.standard_columns = standard_columns
        self.manual_map = manual_map or {}
        self.model = SentenceTransformer("snunlp/KR-SBERT-V40K-klueNLI-augSTS")
        self.standard_embeddings = self.model.encode(self.standard_columns, convert_to_tensor=True)
        self.min_similarity = min_similarity

        self.cache_path = cache_path
        self.match_cache = self._load_cache()

    def _load_cache(self):
        if os.path.exists(self.cache_path):
            with open(self.cache_path, "r", encoding="utf-8") as f:
                return json.load(f)
        return {}

    def _save_cache(self):
        with open(self.cache_path, "w", encoding="utf-8") as f:
            json.dump(self.match_cache, f, ensure_ascii=False, indent=2)

    def match(self, raw_column: str, candidates=None, corp_name=None, verbose=True) -> str | None:
        # 1. 수동 매핑
        if raw_column in self.manual_map:
            return self.manual_map[raw_column]

        # 2. 캐시 검색
        if corp_name:
            cached = self.match_cache.get(raw_column, {}).get(corp_name)
            if cached and cached["score"] >= self.min_similarity:
                if verbose:
                    print(f"[🧠] 캐시 매핑: '{raw_column}' → '{cached['matched']}' (score: {cached['score']:.2f})")
                return cached["matched"]

        # 3. 후보 제한
        if candidates:
            standard_subset = [col for col in self.standard_columns if col in candidates]
            standard_embeddings = self.model.encode(standard_subset, convert_to_tensor=True)
        else:
            standard_subset = self.standard_columns
            standard_embeddings = self.standard_embeddings

        # 4. 유사도 계산
        raw_embedding = self.model.encode(raw_column, convert_to_tensor=True)
        cos_scores = util.cos_sim(raw_embedding, standard_embeddings)[0]
        best_idx = torch.argmax(cos_scores).item()
        best_score = cos_scores[best_idx].item()
        best_match = standard_subset[best_idx]

        if verbose:
            print(f"[🔍] '{raw_column}' → '{best_match}' (score: {best_score:.4f})")

        # 5. 기준 이상만 반환
        if best_score >= self.min_similarity:
            if corp_name:
                self.match_cache.setdefault(raw_column, {})[corp_name] = {
                    "matched": best_match,
                    "score": best_score
                }
                self._save_cache()
            return best_match
        else:
            print(f"[⚠️] '{raw_column}' 유사도 {best_score:.2f} → 기준 미달로 매칭 실패")
            return None

def batch_match_columns(
+        self,
+        targets: list[str],
+        raw_candidates: list[str],
+        corp_name: str
+    ) -> dict[str, str]:
+        """
+        기업(corp_name) 단위로, 표준 컬럼 리스트(targets)를
+        한 번에 raw_candidates에서 매핑하고 캐시에 저장합니다.
+        """
+        mapping: dict[str,str] = {}
+        for std_col in targets:
+            # 이미 캐시에 있으면 건너뛰기
+            cached = self.match_cache.get(std_col, {}).get(corp_name)
+            if cached and cached["score"] >= self.min_similarity:
+                mapping[std_col] = cached["matched"]
+                continue
+
+            # 매칭 시도 (verbose=False로 로그 최소화)
+            matched = self.match(std_col, candidates=raw_candidates, corp_name=corp_name, verbose=False)
+            if matched:
+                mapping[std_col] = matched
+        return mapping