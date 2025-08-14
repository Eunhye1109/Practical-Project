package com.project.web.utils;

import java.util.ArrayList;
import java.util.Collections;
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

 // FinancialUtils.java

    public static String debtSignalLabelAvgChange(Map<String, String> debtByYear) {
        Triple t = last3Years(debtByYear);
        if (t == null) return "평가불가";

        double a = t.a, b = t.b, c = t.c;
        double avgChange = ((b - a) + (c - b)) / 2.0;

        // 안전: AVG_CHANGE < 15 AND c < 150
        if (avgChange < 15.0 && c < 150.0) return "안전";

        // 양호: (15 ≤ AVG_CHANGE < 30) OR (150 ≤ c ≤ 200)
        if ((avgChange >= 15.0 && avgChange < 30.0) || (c >= 150.0 && c <= 200.0)) return "양호";

        // 주의: AVG_CHANGE ≥ 30 OR c > 200
        if (avgChange >= 30.0 || c > 200.0) return "주의";

        return "평가불가";
    }

    public static String debtSignalCodeAvgChange(Map<String, String> debtByYear) {
        String label = debtSignalLabelAvgChange(debtByYear);
        return switch (label) {
            case "안전" -> "1";
            case "양호" -> "2";
            case "주의" -> "3";
            default -> "0";
        };
    }

    // --- helpers ---
    private static class Triple { double a,b,c; Triple(double a,double b,double c){this.a=a;this.b=b;this.c=c;} }

    private static Triple last3Years(Map<String, String> byYear) {
        if (byYear == null || byYear.size() < 3) return null;
        List<String> years = new ArrayList<>(byYear.keySet());
        Collections.sort(years);                 // "2022","2023","2024" 처럼 오름차순
        int n = years.size();
        String y1 = years.get(n-3), y2 = years.get(n-2), y3 = years.get(n-1);
        Double a = parsePct(byYear.get(y1));
        Double b = parsePct(byYear.get(y2));
        Double c = parsePct(byYear.get(y3));
        if (a == null || b == null || c == null) return null;
        return new Triple(a,b,c);
    }

    private static Double parsePct(String s) {
        if (s == null) return null;
        try { return Double.parseDouble(s.replace(",", "")); }
        catch (Exception e) { return null; }
    }

}
