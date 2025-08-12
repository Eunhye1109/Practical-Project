package com.project.web.utils;

public final class NumberParseUtil {
    private NumberParseUtil() {}

    public static Double parseNullable(Object val) {
        if (val == null) return null;
        String s = String.valueOf(val).trim();
        if (s.equalsIgnoreCase("null") || s.isEmpty()) return null;
        try {
            return Double.parseDouble(s.replaceAll("[^0-9\\.-]", ""));
        } catch (Exception e) {
            return null;
        }
    }

    public static Integer parseIntNullable(Object val) {
        Double d = parseNullable(val);
        return d == null ? null : d.intValue();
    }
}
