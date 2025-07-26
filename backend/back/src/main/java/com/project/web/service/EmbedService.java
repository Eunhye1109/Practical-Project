package com.project.web.service;

import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@Service
public class EmbedService {

    private final RestTemplate restTemplate = new RestTemplate();

    public Map<String, String> getEmbeddingMatches(List<String> targetCols, Set<String> candidateCols) {
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
                Map<String, String> matched = new HashMap<>();
                for (String target : targetCols) {
                    Map<String, Object> entry = (Map<String, Object>) result.get(target);
                    matched.put(target, (String) entry.get("match"));
                }
                return matched;
            }
        } catch (Exception e) {
            System.err.println("[임베딩 API 오류] " + e.getMessage());
        }

        return Collections.emptyMap();
    }
}
