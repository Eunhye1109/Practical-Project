// SimilarCorpService.java
package com.project.web.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.web.dto.SimilarCorpDTO;
import com.project.web.mapper.CorpLogoMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriUtils;

import java.nio.charset.StandardCharsets;
import java.util.*;

@Slf4j // 
@Service
@RequiredArgsConstructor
public class SimilarCorpService {

    @Qualifier("fastApiRestTemplate") // 타임아웃 여유있는 빈 권장
    private final RestTemplate restTemplate;

    private final CorpLogoMapper corpLogoMapper; // findLogoUrlByName(String)
    private final ObjectMapper om = new ObjectMapper();

    @Value("${fastapi.base-url:http://localhost:8000}")
    private String fastapi;

    /**
     * FastAPI 유사상장사 Top3 호출 + 로고 조인 + DTO 변환까지 여기서 끝낸다.
     */
    public List<SimilarCorpDTO> fetchTop3(String corpName) {
        long t0 = System.currentTimeMillis();

        if (corpName == null || corpName.isBlank()) {
            log.warn("[similar] skip: empty corpName");
            return List.of();
        }

        String url = fastapi + "/similar-listed/ui?company=" +
                UriUtils.encode(corpName, StandardCharsets.UTF_8) +
                "&topk=3&cutoff=15&debug=1"; // 필요시 debug=0로

        log.debug("[similar] GET {}", url);

        try {
            @SuppressWarnings("unchecked")
            Map<String, Object> body = restTemplate.getForObject(url, Map.class);
            log.debug("[similar] http ok, rawBody={}", safeJson(body));

            @SuppressWarnings("unchecked")
            List<Map<String, Object>> arr = (body == null)
                    ? List.of()
                    : (List<Map<String, Object>>) body.getOrDefault("similarCorp", List.of());

            List<SimilarCorpDTO> out = new ArrayList<>();
            for (Map<String, Object> m : arr) {
                String name  = String.valueOf(m.getOrDefault("corpName", ""));
                String prob  = String.valueOf(m.getOrDefault("probability", "0%"));
                String basis = String.valueOf(m.getOrDefault("basis", "문자 bigram 유사도 기반"));

                // 로고 조인 (정규화 재시도 포함)
                String logo = Optional.ofNullable(corpLogoMapper.findLogoUrlByName(name))
                        .orElse("");
                if (logo.isBlank()) {
                    String norm = name.replaceAll("\\s+", "").replaceAll("[()]", "");
                    logo = Optional.ofNullable(corpLogoMapper.findLogoUrlByName(norm))
                            .orElse("");
                    if (logo.isBlank()) {
                        log.debug("[similar] logo-miss name='{}' norm='{}'", name, norm);
                    }
                }

                SimilarCorpDTO dto = new SimilarCorpDTO();
                dto.setCorpName(name);
                dto.setLogo(logo);
                dto.setProbability(prob);
                dto.setBasis(basis);
                out.add(dto);
            }

            log.debug("[similar] mapped {} items, sample={}", out.size(), out.stream().limit(3).toList());
            return out;

        } catch (Exception e) {
            log.error("[similar] fail corpName='{}' : {}", corpName, e.toString(), e);
            return List.of();
        } finally {
            log.debug("[similar] total={}ms", System.currentTimeMillis() - t0);
        }
    }

    private String safeJson(Object o) {
        try { return om.writerWithDefaultPrettyPrinter().writeValueAsString(o); }
        catch (Exception ignore) { return String.valueOf(o); }
    }
}
