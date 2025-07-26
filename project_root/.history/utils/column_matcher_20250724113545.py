from sentence_transformers import SentenceTransformer, util
import torch

class ColumnMatcher:
    def __init__(self, standard_columns):
        self.standard_columns = standard_columns
        self.model = SentenceTransformer('jhgan/ko-sbert-nli')  # 경량, 빠름
        self.standard_embeddings = self.model.encode(standard_columns, convert_to_tensor=True)

    def match(self, target_column, top_k=5):
        target_embedding = self.model.encode(target_column, convert_to_tensor=True)
        cos_scores = util.cos_sim(target_embedding, self.standard_embeddings)[0]
        top_results = torch.topk(cos_scores, k=top_k)

# matcher.py 내부에
self.cache = {}

def match(self, col):
    if col in self.cache:
        return self.cache[col]
    
    result = self._compute_match(col)
    self.cache[col] = result
    return result


        print(f"[🔍] '{target_column}' 유사도 Top {top_k}:")
        for score, idx in zip(top_results.values, top_results.indices):
            print(f"    → {self.standard_columns[idx]} (유사도: {score.item():.4f})")

        best_match = self.standard_columns[top_results.indices[0]]
        return best_match
