package com.project.web.service;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import com.project.web.dto.MatchResultDTO;
import com.project.web.dto.ResponseDTO;
import com.project.web.dto.SearchResultDTO;
import com.project.web.mapper.SearchHisMapper;
import com.project.web.mapper.TargetColMapper;
import com.project.web.utils.ConvertToFlatYearlyListUtil;
import com.project.web.vo.ColumnMatchVO;
import com.project.web.vo.SearchwordVO;
import com.project.web.vo.TargetColVO;

import java.util.*;

@Service
@RequiredArgsConstructor
public class SearchServiceImpl implements SearchService {

    private final FetchServiceImpl fetchService;
    private final EmbedServiceImpl embedService;
    private final ColumnMapperService columnMapperService;
    private final TargetColMapper targetColMapper;
    private final FinancialRatioService financialRatioService;
    private final SearchHisMapper searchHisMapper;

    private static final List<String> YEARS = List.of("2024", "2023", "2022");

    @Override
    public SearchResultDTO search(String corpName) {

    	// 1. FastAPI에서 기업 컬럼 수집
        System.out.println("📦 [1] FastAPI fetch 시작 → corpName = " + corpName);
        Map<String, Object> allYearData = fetchService.fetchColumns(corpName);
        System.out.println("📦 [1] allYearData.keys = " + allYearData.keySet());

        // 2. 전체 rawCols 수집 (3개년 통합)
        Set<String> rawCols = new HashSet<>();
        for (String year : YEARS) {
            if (allYearData.containsKey(year)) {
                Map<String, Object> yearData = (Map<String, Object>) allYearData.get(year);
                rawCols.addAll(yearData.keySet());
            }
        }
        if (rawCols.isEmpty()) {
            System.out.println("❌ [1] 최근 3개년 데이터 없음");
            throw new RuntimeException("해당 기업의 최근 3개년 데이터가 존재하지 않습니다.");
        }

        // 3. 대표 컬럼 조회
        List<TargetColVO> targetCols = targetColMapper.selectAllTargetCols();
        System.out.println("📌 [2] 대표컬럼 개수 = " + targetCols.size());

        Map<String, String> finalMatches = new LinkedHashMap<>();
        List<String> unmatchedTargets = new ArrayList<>();

        // 4. DB 기반 매핑 시도
        for (TargetColVO target : targetCols) {
            String targetColName = target.getTargetColName();
            if (targetColName == null || targetColName.isBlank()) continue;

            String matched = columnMapperService.findMappedCol(targetColName, rawCols);
            if (matched != null) {
                finalMatches.put(targetColName, matched);
                System.out.println("✅ [2] DB 매핑 성공: " + targetColName + " → " + matched);
            } else {
                unmatchedTargets.add(targetColName);
                System.out.println("❌ [2] DB 매핑 실패: " + targetColName);
            }
        }

        // 5. 임베딩 기반 보완 매핑
        if (!unmatchedTargets.isEmpty()) {
            System.out.println("📡 [3] 임베딩 매핑 요청 대상 = " + unmatchedTargets.size() + "개");
            Map<String, MatchResultDTO> embedMatches = embedService.getEmbeddingMatches(unmatchedTargets, rawCols);
            for (String target : unmatchedTargets) {
                MatchResultDTO match = embedMatches.get(target);
                if (match != null && match.getSimilarity() >= 0.8) {
                    String matched = match.getMatchedCol();
                    double similarity = match.getSimilarity();

                    finalMatches.put(target, matched);
                    columnMapperService.saveMapping(target, matched, similarity);
                    System.out.println("✅ [3] 임베딩 매핑 성공: " + target + " → " + matched + " (유사도: " + similarity + ")");
                } else {
                    System.out.println("❌ [3] 임베딩 실패 또는 유사도 낮음: " + target);
                }
            }
        }

        // 6. 결과 조립 (연도별 값 포함)
        List<ColumnMatchVO> columnList = new ArrayList<>();
        for (TargetColVO target : targetCols) {
            String targetColName = target.getTargetColName();
            String matched = finalMatches.get(targetColName);

            Map<String, String> yearValues = new LinkedHashMap<>();
            if (matched != null) {
                for (String year : YEARS) {
                    Map<String, Object> yearData = (Map<String, Object>) allYearData.get(year);
                    if (yearData != null && yearData.containsKey(matched)) {
                        yearValues.put(year, String.valueOf(yearData.get(matched)));
                    } else {
                        yearValues.put(year, null);
                    }
                }
            }

            System.out.println("📊 [4] 최종 매핑: " + targetColName + " → " + matched + ", 연도별 값: " + yearValues);

            columnList.add(
                ColumnMatchVO.builder()
                    .targetCol(targetColName)
                    .matchedCol(matched)
                    .values(yearValues)
                    .build()
            );
        }

        Map<String, Map<String, String>> ratios = financialRatioService.calculate(columnList);
        List<Map<String, Object>> flatColumns = ConvertToFlatYearlyListUtil.convert(columnList, ratios);

        return SearchResultDTO.builder()
            .corpName(corpName)
            .columns(flatColumns)
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


	@Override
	public ResponseDTO hisInsert(SearchwordVO searchHis) {
		int ok = searchHisMapper.hisInsert(searchHis);
		if(ok == 0) {return ResponseDTO.builder().success(false).message("등록실패").build();}
		return ResponseDTO.builder().success(true).message("등록완료").build();
	}
    
    

}