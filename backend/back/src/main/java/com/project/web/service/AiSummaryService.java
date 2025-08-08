package com.project.web.service;

import java.util.Arrays;
import java.util.Collection;
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

    private final RestTemplate restTemplate;

    public List<AiSummaryDTO> getAiSummaryFromFastAPI(String corpCode, String userPurpose) {
        String url = "http://localhost:8000/api/gpt/summary";  // ✅ 변경됨

        Map<String, String> request = new HashMap<>();
        request.put("corpCode", corpCode);              // ✅ corpName → corpCode
        request.put("userPurpose", userPurpose);

        try {
            ResponseEntity<AiSummaryDTO[]> response = restTemplate.postForEntity(
                url,
                request,
                AiSummaryDTO[].class
            );

            return Arrays.asList(response.getBody());
        } catch (Exception e) {
            System.out.println("❌ FastAPI 감성 분석 호출 실패: " + e.getMessage());
            return List.of();  // ✅ Java 9 이상이면 Collection.emptyList()보다 List.of() 추천
        }
    }

}
