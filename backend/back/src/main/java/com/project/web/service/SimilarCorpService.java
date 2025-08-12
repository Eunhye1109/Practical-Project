// src/main/java/com/project/web/service/SimilarCorpService.java
package com.project.web.service;

import com.project.web.dto.SimilarCorpDTO;
import com.project.web.mapper.CorpLogoMapper;
import com.project.web.utils.SimilarCandidates;
import com.project.web.utils.SimilarStringUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class SimilarCorpService {

    private final CorpLogoMapper corpLogoMapper; // findLogoUrlByName(String)
    

    public List<SimilarCorpDTO> fetchTop3(String corpName) {
        if (corpName == null || corpName.isBlank()) return List.of();

        String base = corpName;
        String baseNorm = SimilarStringUtil.normalize(base);

        // 후보 스코어링
        List<SimilarCorpDTO> scored = new ArrayList<>();
        for (String cand : SimilarCandidates.TOP100_NAMES) {
            if (cand == null || cand.isBlank()) continue;
            // 자기 자신은 제외 (정규화 동일시)
            if (SimilarStringUtil.normalize(cand).equals(baseNorm)) continue;

            double j = SimilarStringUtil.jaccard(base, cand);
            double pct = Math.round(j * 1000.0) / 10.0; // 소수1자리
            SimilarCorpDTO dto = new SimilarCorpDTO();
            dto.setCorpName(cand);
            dto.setProbability(pct + "%");
            dto.setBasis("문자 bigram 유사도 기반");

            String logo = corpLogoMapper.findLogoUrlByName(cand);
            dto.setLogo(logo != null ? logo : "");
            scored.add(dto);
        }

        // 내림차순 상위3
        scored.sort((a, b) -> {
            double pa = toDouble(a.getProbability());
            double pb = toDouble(b.getProbability());
            return Double.compare(pb, pa);
        });

        // 0%만 주르륵이면 빈 리스트로
        List<SimilarCorpDTO> top = scored.stream().limit(3).toList();
        boolean allZero = top.stream().allMatch(d -> toDouble(d.getProbability()) <= 0.0);
        return allZero ? List.of() : top;
    }

    private static double toDouble(String p) {
        if (p == null) return 0.0;
        try {
            return Double.parseDouble(p.replace("%","").trim());
        } catch (Exception e) {
            return 0.0;
        }
    }
}
