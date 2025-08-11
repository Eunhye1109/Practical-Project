package com.project.web.utils;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Component;

import com.project.web.dto.InfoBoxDTO;
import com.project.web.mapper.SearchListMapper;
import com.project.web.vo.InfoBaseVO;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class InfoBoxAssembler {

    private final SearchListMapper searchListMapper;

 // InfoBoxAssembler.java

 // InfoBoxAssembler.java (변경된 build 메서드의 일부)
    public InfoBoxDTO build(String corpCode, List<Map<String, Object>> flatColumns) {
        InfoBaseVO cache = searchListMapper.selectInfoBaseByCorpCode(corpCode);
        InfoBoxDTO dto = new InfoBoxDTO();

        dto.setCorpSummary(cache != null ? cache.getGptSummary() : "정보없음");

        Map<String, Object> latestRow = pickLatestRow(flatColumns, "2024", "2023", "2022");

        // ✅ 매출액/직원수: 숫자로 안전 변환
        long revenueNum = toLong(latestRow, "매출액", "영업수익", "매출");
        long employeesNum = toLong(latestRow, "sm", "직원수", "총근로자수", "종업원수");

        List<String> infoData = new ArrayList<>();
        infoData.add(cache != null ? cache.getCeoName() : "정보없음");
        infoData.add(cache != null ? cache.getStockType() : "정보없음");
        infoData.add(revenueNum > 0 ? formatDecimal(revenueNum) : "정보없음");   // ← 9,744,986,676
        infoData.add(employeesNum > 0 ? (employeesNum + "명") : "정보없음");       // ← 141명
        infoData.add(cache != null ? cache.getEstablishDate() : "정보없음");

        dto.setInfoData(infoData);
        return dto;
    }

    // ▼ 도우미 메서드 추가
    private long toLong(Map<String, Object> row, String... keys) {
        if (row == null) return 0L;
        for (String k : keys) {
            Object v = row.get(k);
            long n = toLong(v);
            if (n != 0L) return n;
        }
        return 0L;
    }
    private long toLong(Object v) {
        if (v == null) return 0L;
        if (v instanceof Number n) return n.longValue();
        try {
            return new java.math.BigDecimal(v.toString()).longValue(); // E표기 안전 변환
        } catch (Exception e) {
            return 0L;
        }
    }
    private String formatDecimal(long n) {
        return java.text.NumberFormat.getInstance(java.util.Locale.KOREA).format(n);
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
