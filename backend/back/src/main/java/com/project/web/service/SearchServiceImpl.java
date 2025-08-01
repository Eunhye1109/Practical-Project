package com.project.web.service;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import com.project.web.dto.SearchResultDTO;
import com.project.web.mapper.TargetColMapper;
import com.project.web.vo.ColumnMatchVO;
import com.project.web.vo.TargetColVO;

import java.util.*;

@Service
@RequiredArgsConstructor
public class SearchServiceImpl implements SearchService {

    private final FetchServiceImpl fetchService;
    private final EmbedServiceImpl embedService;
    private final ColumnMapperService columnMapperService;
    private final TargetColMapper targetColMapper;

    private static final List<String> YEARS = List.of("2024", "2023", "2022");

    @Override
    public SearchResultDTO search(String corpName) {

        // 1. FastAPI에서 기업 컬럼 수집
        System.out.println("📦 [1] FastAPI fetch 시작 → corpName = " + corpName);
        Map<String, Object> allYearData = fetchService.fetchColumns(corpName);
        System.out.println("📦 [1] allYearData.keys = " + allYearData.keySet());

        Map<String, Object> latestData = extractLatestYearData(allYearData);
        if (latestData == null) {
            System.out.println("❌ [1] 최근 3개년 데이터 없음");
            throw new RuntimeException("해당 기업의 최근 3개년 데이터가 존재하지 않습니다.");
        }
        System.out.println("✅ [1] latestData.keySet = " + latestData.keySet());

        Set<String> rawCols = latestData.keySet();
        List<TargetColVO> targetCols = targetColMapper.selectAllTargetCols();  // 대표 컬럼 목록
        System.out.println("📌 [2] 대표컬럼 개수 = " + targetCols.size());

        Map<String, String> finalMatches = new LinkedHashMap<>();
        List<String> unmatchedTargets = new ArrayList<>();

        // 2. 기존 DB 매핑 시도
        for (TargetColVO target : targetCols) {
            String targetColName = target.getTargetColName();  // VO에서 꺼내기
            if (targetColName == null || targetColName.isBlank()) {
                System.out.println("⚠️ [2.1] targetColName이 null 또는 공백이라 skip");
                continue;
            }
            String matched = columnMapperService.findMappedCol(targetColName, rawCols);
            if (matched != null) {
                System.out.println("✅ [2] 매핑 성공 (DB): " + targetColName + " → " + matched);
                finalMatches.put(targetColName, matched);
            } else {
                System.out.println("❌ [2] 매핑 실패 (DB): " + targetColName);
                unmatchedTargets.add(targetColName);
            }
        }

        // 3. 임베딩 호출로 남은 것 매핑
        if (!unmatchedTargets.isEmpty()) {
            System.out.println("📡 [3] 임베딩 매핑 요청 대상 = " + unmatchedTargets.size() + "개");
            Map<String, String> embedMatches = embedService.getEmbeddingMatches(unmatchedTargets, rawCols);
            for (String target : unmatchedTargets) {
                String matched = embedMatches.get(target);
                if (matched != null) {
                    System.out.println("✅ [3] 임베딩 매핑 성공: " + target + " → " + matched);
                    finalMatches.put(target, matched);
                    columnMapperService.saveMapping(target, matched);  // DB 저장
                } else {
                    System.out.println("❌ [3] 임베딩 매핑 실패: " + target);
                }
            }
        }

        List<ColumnMatchVO> columnList = new ArrayList<>();

        // 4. 최종 결과 조립
        System.out.println("🔧 [4] 최종 결과 조립 시작");
        for (TargetColVO target : targetCols) {
            String targetColName = target.getTargetColName();
            String matched = finalMatches.get(targetColName);
            String value = matched != null ? (String) latestData.get(matched) : null;

            System.out.println("📊 [4] 최종 매핑: " + targetColName + " → " + matched + ", 값: " + value);

            columnList.add(
                ColumnMatchVO.builder()
                    .targetCol(targetColName)
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