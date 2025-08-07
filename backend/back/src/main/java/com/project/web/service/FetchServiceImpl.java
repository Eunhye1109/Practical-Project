package com.project.web.service;

import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import lombok.RequiredArgsConstructor;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class FetchServiceImpl implements FetchService{

    private final RestTemplate restTemplate = new RestTemplate();

    public Map<String, Object> fetchColumns(String corpCode) {
        String url = "http://localhost:8000/fetch?corp_code=" + corpCode;
        ResponseEntity<Map> response = restTemplate.getForEntity(url, Map.class);
        if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
            return response.getBody(); 
        }
        throw new RuntimeException("FastAPI fetch 호출 실패");
    }
}
