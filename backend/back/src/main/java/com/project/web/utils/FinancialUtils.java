package com.project.web.utils;

import java.util.HashMap;
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

    private static double parse(String s) {
        return Double.parseDouble(s.replace(",", ""));
    }
}
