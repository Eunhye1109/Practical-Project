package com.project.web.service;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.project.web.dto.AiSummaryDTO;
import com.project.web.dto.NewsDataDTO;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AiSummaryService {

    private final RestTemplate restTemplate = new RestTemplate();
    // ↑ 혹은 @Bean으로 주입 받아도 OK

    public List<AiSummaryDTO> getAiSummaryFromFastAPI(String corpCode, String userPurpose,
    		List<Map<String, Object>> graphData, List<NewsDataDTO> newsData) {
        if (corpCode == null || corpCode.isBlank()) {
            System.out.println("❌ corpCode is null/blank");
            return List.of();
        }
        String safePurpose = (userPurpose == null || userPurpose.isBlank()) ? "안정형" : userPurpose;

        String url = "http://localhost:8000/api/gpt/summary";

     // newsData DTO → FastAPI가 기대하는 단순 Map으로 변환
        List<Map<String, Object>> newsPayload = null;
        if (newsData != null) {
            newsPayload = newsData.stream().map(n -> {
                Map<String, Object> m = new HashMap<>();
                m.put("date", n.getDate());
                m.put("title", n.getTitle());
                m.put("body", n.getBody());
                m.put("link", n.getLink());
                return m;
            }).toList();
        }

        Map<String, Object> request = new HashMap<>();
        request.put("corpCode", corpCode);
        request.put("userPurpose", safePurpose);
        request.put("graphData", graphData);     // ← 그대로 보냄(List<Map>)
        request.put("newsData", newsPayload);    // ← 변환본

        try {
            var headers = new org.springframework.http.HttpHeaders();
            headers.setContentType(org.springframework.http.MediaType.APPLICATION_JSON);
            var entity = new org.springframework.http.HttpEntity<>(request, headers);

            ResponseEntity<AiSummaryDTO[]> response =
                restTemplate.postForEntity(url, entity, AiSummaryDTO[].class);

            AiSummaryDTO[] body = response.getBody();
            return (body != null) ? Arrays.asList(body) : List.of();
        } catch (Exception e) {
            System.out.println("❌ FastAPI 감성 분석 호출 실패: " + e.getMessage());
            return List.of();
        }
    }
}




