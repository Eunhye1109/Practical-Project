package com.project.web.service;

import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.project.web.dto.MatchResultDTO;

import java.util.*;

@Service
public class EmbedServiceImpl implements EmbedService{

    private final RestTemplate restTemplate = new RestTemplate();

    public Map<String, MatchResultDTO> getEmbeddingMatches(List<String> targetCols, Set<String> candidateCols) {
        String url = "http://localhost:8000/embed";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        Map<String, Object> payload = new HashMap<>();
        payload.put("target_cols", targetCols);
        payload.put("candidate_cols", new ArrayList<>(candidateCols));

        HttpEntity<Map<String, Object>> request = new HttpEntity<>(payload, headers);

        try {
            ResponseEntity<Map> response = restTemplate.postForEntity(url, request, Map.class);
            if (response.getStatusCode().is2xxSuccessful()) {
                Map<String, Object> result = response.getBody();
                Map<String, MatchResultDTO> matches = new HashMap<>();
                for (String target : targetCols) {
                    Object raw = result.get(target);
                    if (!(raw instanceof Map)) {
                        System.err.println("❌ [임베딩결과 오류] 응답 포맷이 잘못됨: " + target);
                        continue;
                    }

                    Map<String, Object> entry = (Map<String, Object>) raw;
                    String matchedCol = (String) entry.get("match");
                    Object scoreObj = entry.get("score");

                    if (matchedCol == null || scoreObj == null) {
                        System.err.println("❌ [임베딩결과 오류] " + target + " → 데이터 누락");
                        continue;
                    }

                    double similarity = (scoreObj instanceof Number)
                        ? ((Number) scoreObj).doubleValue()
                        : 0.0;

                    matches.put(target, new MatchResultDTO(matchedCol, similarity));

                    System.out.println("📌 [임베딩결과] " + target + " → " + matchedCol + " (유사도: " + similarity + ")");
                }

                
                return matches;
            }
        } catch (Exception e) {
            System.err.println("[임베딩 API 오류] " + e.getMessage());
        }

        return Collections.emptyMap();
    }
}
