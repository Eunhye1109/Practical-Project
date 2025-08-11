package com.project.web.service;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.project.web.dto.AiSummaryDTO;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AiSummaryService {

    private final RestTemplate restTemplate = new RestTemplate();
    // ↑ 혹은 @Bean으로 주입 받아도 OK

    public List<AiSummaryDTO> getAiSummaryFromFastAPI(String corpCode, String userPurpose) {
        if (corpCode == null || corpCode.isBlank()) {
            System.out.println("❌ corpCode is null/blank");
            return List.of();
        }
        String safePurpose = (userPurpose == null || userPurpose.isBlank()) ? "안정형" : userPurpose;

        String url = "http://localhost:8000/api/gpt/summary";

        Map<String, String> request = new HashMap<>(); // Map.of 금지
        request.put("corpCode", corpCode);
        request.put("userPurpose", safePurpose);

        try {
            ResponseEntity<AiSummaryDTO[]> response =
                restTemplate.postForEntity(url, request, AiSummaryDTO[].class);
            AiSummaryDTO[] body = response.getBody();
            return (body != null) ? Arrays.asList(body) : List.of();
        } catch (Exception e) {
            System.out.println("❌ FastAPI 감성 분석 호출 실패: " + e.getMessage());
            return List.of();
        }
    }
}




