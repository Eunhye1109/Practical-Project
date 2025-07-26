package com.project.web.service;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class SearchServiceImpl implements SearchService {

    private FetchServiceImpl fetchService;
    private EmbedService embedService;
    private ColumnMapperService columnMapperService;

    private static final List<String> YEARS = List.of("2023", "2022", "2021");

    @Override
    public Map<String, Object> search(String corpName) {
        // 1. FastAPI에서 기업 컬럼 수집
        Map<String, Object> allYearData = fetchService.fetchColumns(corpName);
        Map<String, Object> latestData = extractLatestYearData(allYearData);

        if (latestData == null) {
            throw new RuntimeException("해당 기업의 최근 3개년 데이터가 존재하지 않습니다.");
        }

        Set<String> rawCols = latestData.keySet();
        List<String> targetCols = getTargetColsFromDB();  // 대표 컬럼 목록

        Map<String, String> finalMatches = new LinkedHashMap<>();
        List<String> unmatchedTargets = new ArrayList<>();

        // 2. 기존 DB 매핑 시도
        for (String target : targetCols) {
            String matched = columnMapperService.findMappedCol(target, rawCols);
            if (matched != null) {
                finalMatches.put(target, matched);
            } else {
                unmatchedTargets.add(target);
            }
        }

        // 3. 임베딩 호출로 남은 것 매핑
        if (!unmatchedTargets.isEmpty()) {
            Map<String, String> embedMatches = embedService.getEmbeddingMatches(unmatchedTargets, rawCols);
            for (String target : unmatchedTargets) {
                String matched = embedMatches.get(target);
                if (matched != null) {
                    finalMatches.put(target, matched);
                    columnMapperService.saveMapping(target, matched);  // DB 저장
                }
            }
        }

        // 4. 최종 결과 조립
        Map<String, Object> result = new LinkedHashMap<>();
        for (String target : targetCols) {
            String matched = finalMatches.get(target);
            Object value = matched != null ? latestData.get(matched) : null;
            result.put(target, Map.of("matched_col", matched, "value", value));
        }

        return result;
    }

    private Map<String, Object> extractLatestYearData(Map<String, Object> all) {
        for (String year : YEARS) {
            if (all.containsKey(year)) {
                return (Map<String, Object>) all.get(year);
            }
        }
        return null;
    }

    private List<String> getTargetColsFromDB() {
        // TODO: JPA 조회
        return List.of("영업이익", "순이익", "ROE", "자기자본", "부채비율");
    }
}