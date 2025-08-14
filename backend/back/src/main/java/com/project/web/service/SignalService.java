package com.project.web.service;

import java.nio.charset.StandardCharsets;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriUtils;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SignalService {

	private final RestTemplate restTemplate;
	
	 @Value("${signals.base-url:http://localhost:8000}")
	    private String base;

	    public Map<String, Object> getTrafficLight(String company) {
	        String url = base + "/traffic-light?company=" + UriUtils.encode(company, StandardCharsets.UTF_8);
	        return restTemplate.getForObject(url, Map.class);
	    }

	    public Map<String, Object> getSimilarListed(String company) {
	        String url = base + "/similar-listed?company=" + UriUtils.encode(company, StandardCharsets.UTF_8);
	        return restTemplate.getForObject(url, Map.class);
	    }
	}