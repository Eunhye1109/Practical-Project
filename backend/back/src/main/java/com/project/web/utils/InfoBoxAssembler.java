package com.project.web.utils;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Component;

import com.project.web.dto.InfoBoxDTO;
import com.project.web.mapper.SearchListMapper;
import com.project.web.vo.SearchListCacheVO;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class InfoBoxAssembler {

    private final SearchListMapper searchListMapper;

 // InfoBoxAssembler.java

    public InfoBoxDTO build(String corpCode, List<Map<String, Object>> flatColumns) {
        SearchListCacheVO cache = searchListMapper.selectInfoBaseByCorpCode(corpCode);

        InfoBoxDTO dto = new InfoBoxDTO();

        // 1) 기업 소개
        dto.setCorpSummary(cache != null ? cache.getGptSummary() : "정보없음");

        // 2) flatColumns에서 최근 연도 데이터 추출
        Map<String, Object> latestRow = pickLatestRow(flatColumns, "2024", "2023", "2022");

        // 3) 매출/직원수 추출
        String revenue = firstNonNull(latestRow, "매출액", "영업수익", "매출");
        String employees = firstNonNull(latestRow, "직원수", "총근로자수", "종업원수");

        // 4) infoData 구성
        List<String> infoData = new ArrayList<>();
        infoData.add(cache != null ? cache.getCeoName() : "정보없음");
        infoData.add(cache != null ? cache.getStockType() : "정보없음");
        infoData.add(revenue != null ? revenue : "정보없음");
        infoData.add(employees != null ? employees : "정보없음");
        infoData.add(cache != null ? cache.getEstablishDate() : "정보없음");

        dto.setInfoData(infoData);

        return dto;
    }


    private String firstNonNull(Map<String, Object> row, String... keys) {
        if (row == null) return null;
        for (String key : keys) {
            Object value = row.get(key);
            if (value != null) return String.valueOf(value);
        }
        return null;
    }

    
    private Map<String, Object> pickLatestRow(List<Map<String, Object>> flatColumns, String... years) {
        for (String y : years) {
            for (Map<String, Object> row : flatColumns) {
                Object v = row.get("year");
                if (v != null && y.equals(String.valueOf(v))) {
                    return row;
                }
            }
        }
        return null;
    }
    
}
