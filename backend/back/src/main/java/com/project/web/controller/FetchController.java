package com.project.web.controller;
import java.util.Map;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/api")
public class FetchController {

    private final RestTemplate restTemplate = new RestTemplate();

    @GetMapping("/fetch-columns")
    public ResponseEntity<?> fetchColumns(@RequestParam String corpName) {
        String fastApiUrl = "http://localhost:8000/fetch?corp_name=" + corpName;
        ResponseEntity<Map> response = restTemplate.getForEntity(fastApiUrl, Map.class);
        return ResponseEntity.ok(response.getBody());
    }

    @PostMapping("/embed-columns")
    public ResponseEntity<?> embedColumns(@RequestBody Map<String, Object> request) {
        String fastApiUrl = "http://localhost:8000/embed";
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(request, headers);
        ResponseEntity<Map> response = restTemplate.postForEntity(fastApiUrl, entity, Map.class);
        return ResponseEntity.ok(response.getBody());
    }
}
