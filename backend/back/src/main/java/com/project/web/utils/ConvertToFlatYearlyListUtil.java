package com.project.web.utils;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import com.project.web.vo.ColumnMatchVO;

public class ConvertToFlatYearlyListUtil {

    public static List<Map<String, Object>> convert(List<ColumnMatchVO> columns, Map<String, Map<String, String>> ratios) {
        Map<String, Map<String, Object>> yearMap = new LinkedHashMap<>();

        List<String> years = List.of("2022", "2023", "2024");

        for (String year : years) {
            yearMap.put(year, new LinkedHashMap<>());
            yearMap.get(year).put("year", year);
        }

        // raw 컬럼 추가
        for (ColumnMatchVO col : columns) {
            String key = col.getTargetCol();
            for (Map.Entry<String, String> e : col.getValues().entrySet()) {
                yearMap.get(e.getKey()).put(key, parseNumber(e.getValue()));
            }
        }

        // 비율 추가
        for (Map.Entry<String, Map<String, String>> entry : ratios.entrySet()) {
            String ratioKey = entry.getKey();
            Map<String, String> yearMapValues = entry.getValue();
            for (Map.Entry<String, String> e : yearMapValues.entrySet()) {
                yearMap.get(e.getKey()).put(ratioKey, parseNumber(e.getValue()));
            }
        }

        return new ArrayList<>(yearMap.values());
    }

    private static Object parseNumber(String s) {
        if (s == null) return null;
        try {
            return Double.parseDouble(s.replace(",", ""));
        } catch (Exception e) {
            return s;
        }
    }
}
