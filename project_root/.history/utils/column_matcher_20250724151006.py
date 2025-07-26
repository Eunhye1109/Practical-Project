# utils/column_matcher.py
from sentence_transformers import SentenceTransformer, util
import torch

class ColumnMatcher:
    def __init__(self, standard_columns, manual_map=None, model_name="jhgan/ko-sbert-nli"):
        self.standard_columns = standard_columns
        self.manual_map = manual_map or {}
        self.model = SentenceTransformer(model_name)
        self.standard_embeddings = self.model.encode(standard_columns, convert_to_tensor=True)
        self.cache = {}

    def match(self, raw_column, candidates=None, top_k=5, verbose=True):
        # 1. 수동 매핑
        if raw_column in self.manual_map:
            if verbose:
                print(f"[✅] 수동 매핑: '{raw_column}' → '{self.manual_map[raw_column]}'")
            return self.manual_map[raw_column]

        # 2. 캐시 확인
        if raw_column in self.cache:
            if verbose:
                print(f"[🧠] 캐시된 매핑: '{raw_column}' → '{self.cache[raw_column]}'")
            return self.cache[raw_column]

        # 3. 모델 기반 유사도 계산
        raw_embedding = self.model.encode(raw_column, convert_to_tensor=True)
        cos_scores = util.cos_sim(raw_embedding, self.standard_embeddings)[0]
        top_results = torch.topk(cos_scores, k=top_k)

        if verbose:
            print(f"[🔍] '{raw_column}' 유사도 Top {top_k}:")
            for score, idx in zip(top_results.values, top_results.indices):
                print(f"    → {self.standard_columns[idx]} (유사도: {score.item():.4f})")

        best_match = self.standard_columns[top_results.indices[0].item()]
        self.cache[raw_column] = best_match
        return best_match
