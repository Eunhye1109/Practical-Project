package com.project.web.service;

import java.nio.charset.StandardCharsets;
import java.util.List;

import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriUtils;

import com.project.web.dto.SearchListDTO;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class SearchListApiClient {

    private final RestTemplate restTemplate;

    public List<SearchListDTO> fetchCompanySummaries(String corpName) {
        String url = "http://localhost:8000/api/search/list?keyword=" + UriUtils.encode(corpName, StandardCharsets.UTF_8);

        ResponseEntity<List<SearchListDTO>> response = restTemplate.exchange(
            url,
            HttpMethod.GET,
            null,
            new ParameterizedTypeReference<List<SearchListDTO>>() {}
        );

            return response.getBody();
    }
}
