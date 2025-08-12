package com.project.web.utils;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class FinancialUtils {

    public static Map<String, String> divide(Map<String, String> num, Map<String, String> den) {
        Map<String, String> result = new HashMap<>();
        for (String year : num.keySet()) {
            try {
                double n = parse(num.get(year));
                double d = parse(den.get(year));
                if (d != 0) result.put(year, String.format("%.2f", n / d * 100));
            } catch (Exception e) {
                result.put(year, null);
            }
        }
        return result;
    }

    public static Map<String, String> sum(Map<String, String> a, Map<String, String> b) {
        Map<String, String> result = new HashMap<>();
        for (String year : a.keySet()) {
            try {
                double val = parse(a.get(year)) + parse(b.get(year));
                result.put(year, String.valueOf(val));
            } catch (Exception e) {
                result.put(year, null);
            }
        }
        return result;
    }
    
    // ✅ 추가: 연도별 YoY 성장률 (%), 첫 해는 null
    public static Map<String, String> yoy(Map<String, String> seriesByYear) {
        Map<String, String> result = new HashMap<>();
        if (seriesByYear == null || seriesByYear.isEmpty()) return result;

        // 연도 오름차순 정렬 (문자 → 숫자 변환, 실패 시 문자열 비교)
        List<String> years = new ArrayList<>(seriesByYear.keySet());
        years.sort((y1, y2) -> {
            try {
                return Integer.compare(Integer.parseInt(y1), Integer.parseInt(y2));
            } catch (Exception e) {
                return y1.compareTo(y2);
            }
        });

        // 첫 해는 기준 없음 → null
        result.put(years.get(0), null);

        for (int i = 1; i < years.size(); i++) {
            String y = years.get(i);
            String py = years.get(i - 1);
            try {
                double curr = parse(seriesByYear.get(y));
                double prev = parse(seriesByYear.get(py));
                if (prev == 0d) {
                    result.put(y, null);
                } else {
                    double pct = (curr - prev) / prev * 100.0; // 표준 YoY
                    result.put(y, String.format("%.2f", pct));
                }
            } catch (Exception e) {
                result.put(y, null);
            }
        }
        return result;
    }

    private static double parse(String s) {
        return Double.parseDouble(s.replace(",", ""));
    }
}
