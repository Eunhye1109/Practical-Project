package com.project.web.service;

import java.nio.charset.StandardCharsets;
import java.util.*;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriUtils;
import com.project.web.dto.SimilarCorpDTO;
import com.project.web.mapper.CorpLogoMapper;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SimilarCorpService {

  @Qualifier("fastApiRestTemplate")
  private final RestTemplate fastApiRestTemplate; // ← 이름도 fastApi로

  private final CorpLogoMapper corpLogoMapper;

  @Value("${fastapi.base-url:http://localhost:8000}")
  private String baseUrl;

  @SuppressWarnings("unchecked")
  public List<SimilarCorpDTO> fetchTop3(String corpName) {
    if (corpName == null || corpName.isBlank()) return List.of();

    String url = baseUrl + "/similar-listed/ui?company="
        + UriUtils.encode(corpName, StandardCharsets.UTF_8) + "&topk=3";

    try {
      Map<String, Object> body = fastApiRestTemplate.getForObject(url, Map.class);
      if (body == null) return List.of();

      List<Map<String, Object>> arr = (List<Map<String, Object>>) body.get("similarCorp");
      if (arr == null) return List.of();

      List<SimilarCorpDTO> list = new ArrayList<>();
      for (Map<String, Object> m : arr) {
        String name = String.valueOf(m.getOrDefault("corpName", ""));
        String logo = corpLogoMapper.findLogoUrlByName(name);  // DB에서 로고 매핑
        SimilarCorpDTO dto = new SimilarCorpDTO();
        dto.setCorpName(name);
        dto.setLogo(logo != null ? logo : "");
        dto.setProbability(String.valueOf(m.getOrDefault("probability", "0%")));
        dto.setBasis(String.valueOf(m.getOrDefault("basis", "문자 bigram 유사도 기반")));
        list.add(dto);
      }
      return list;

    } catch (Exception e) {
      // 부분 실패는 빈 리스트 반환 (전체 화면은 유지)
      return List.of();
    }
  }
}
