package com.project.web.service;

import java.util.List;
import java.util.Map;
import java.util.*;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.project.web.dto.SimilarCorpDTO;
import com.project.web.mapper.CorpLogoMapper;

import lombok.RequiredArgsConstructor;

//SimilarCorpService.java
@Service
@RequiredArgsConstructor
public class SimilarCorpService {
	private final RestTemplate restTemplate;
	private final CorpLogoMapper corpLogoMapper;

	@Value("${fastapi.base-url:http://localhost:8000}")
	private String baseUrl;

	public List<SimilarCorpDTO> fetchTop3(String baseCorpName, List<String> candidateNames) {
		if (baseCorpName == null || baseCorpName.isBlank())
			return List.of();
		if (candidateNames == null || candidateNames.isEmpty())
			return List.of();

		String url = baseUrl + "/similar-listed/ui";

		Map<String, Object> req = new HashMap<>();
		req.put("base", baseCorpName);
		req.put("candidates", candidateNames);
		req.put("topk", 3);

		try {
			@SuppressWarnings("unchecked")
			Map<String, Object> body = restTemplate.postForObject(url, req, Map.class);
			if (body == null)
				return List.of();

			@SuppressWarnings("unchecked")
			List<Map<String, Object>> arr = (List<Map<String, Object>>) body.get("similarCorp");
			if (arr == null)
				return List.of();

			return arr.stream().map(m -> {
				String name = String.valueOf(m.getOrDefault("corpName", ""));
				String logo = corpLogoMapper.findLogoUrlByName(name); // ← DB 조인
				SimilarCorpDTO dto = new SimilarCorpDTO();
				dto.setCorpName(name);
				dto.setLogo(logo != null ? logo : ""); // 못찾으면 빈값
				dto.setProbability(String.valueOf(m.getOrDefault("probability", "0%")));
				dto.setBasis(String.valueOf(m.getOrDefault("basis", "문자 bigram 유사도 기반")));
				return dto;
			}).toList();

		} catch (Exception e) {
			// 부분 실패는 빈 리스트 반환(전체 응답 유지)
			return List.of();
		}
	}
}
