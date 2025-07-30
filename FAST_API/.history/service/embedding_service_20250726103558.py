# 🔹 임베딩 모델 통합

from sentence_transformers import SentenceTransformer, util
from utils.config import SIM_THRESHOLD

model = SentenceTransformer("snunlp/KR-SBERT-V40K-klueNLI-augSTS")

def get_best_matches(target_cols, candidate_cols):
    if not target_cols or not candidate_cols:
        return {}

    embeddings1 = model.encode(target_cols, convert_to_tensor=True)
    embeddings2 = model.encode(candidate_cols, convert_to_tensor=True)

    similarity = util.pytorch_cos_sim(embeddings1, embeddings2)
    result = {}

    for i, target in enumerate(target_cols):
        best_idx = similarity[i].argmax().item()
        score = similarity[i][best_idx].item()
        match = candidate_cols[best_idx] if score >= SIM_THRESHOLD else None
        result[target] = {
            "match": match,
            "score": round(score, 4)
        }

    return result
