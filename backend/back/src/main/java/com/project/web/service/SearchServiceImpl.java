package com.project.web.service;

import lombok.Builder;
import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import com.project.web.dto.SearchResultDTO;
import com.project.web.mapper.TargetColMapper;
import com.project.web.vo.ColumnMatchVO;

import java.util.*;

@Service
@Builder
@RequiredArgsConstructor
public class SearchServiceImpl implements SearchService {

    private FetchServiceImpl fetchService;
    private EmbedServiceImpl embedService;
    private ColumnMapperService columnMapperService;
    private TargetColMapper targetColMapper;

    private static final List<String> YEARS = List.of("2024", "2023", "2022");

    @Override
    public SearchResultDTO search(String corpName) {
        // 1. FastAPI에서 기업 컬럼 수집
        Map<String, Object> allYearData = fetchService.fetchColumns(corpName);
        Map<String, Object> latestData = extractLatestYearData(allYearData);

        if (latestData == null) {
            throw new RuntimeException("해당 기업의 최근 3개년 데이터가 존재하지 않습니다.");
        }

        Set<String> rawCols = latestData.keySet();
        List<String> targetCols = targetColMapper.selectAllTargetCols();  // 대표 컬럼 목록

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
        List<ColumnMatchVO> columnList = new ArrayList<>();
        for (String target : targetCols) {
            String matched = finalMatches.get(target);
            String value = matched != null ? (String) latestData.get(matched) : null;
            columnList.add(
            	    ColumnMatchVO.builder()
                    .targetCol(target)
                    .matchedCol(matched)
                    .value(value)
                    .build()
            );
        }
        return SearchResultDTO.builder()
        	    .corpName(corpName)
        	    .columns(columnList)
        	    .build();


    }

    private Map<String, Object> extractLatestYearData(Map<String, Object> allYearData) {
        for (String year : YEARS) {
            if (allYearData.containsKey(year)) {
                return (Map<String, Object>) allYearData.get(year);
            }
        }
        return null;
    }

}