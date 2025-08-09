package com.project.web.utils;

import java.util.Map;

public class RadarIndustryAverage {

    private static final Map<String, Map<String, Integer>> INDUSTRY_AVG = Map.of(
        "패션", Map.of(
            "안정성", 60,
            "유동성", 65,
            "수익성", 55,
            "성장성", 50,
            "인적투입 효율성", 40
        ),
        "물류", Map.of(
            "안정성", 70,
            "유동성", 50,
            "수익성", 45,
            "성장성", 60,
            "인적투입 효율성", 50
        ),
        "핀테크", Map.of(
            "안정성", 40,
            "유동성", 60,
            "수익성", 70,
            "성장성", 80,
            "인적투입 효율성", 60
        ),
        "유통", Map.of(
            "안정성", 55,
            "유동성", 70,
            "수익성", 50,
            "성장성", 45,
            "인적투입 효율성", 40
        ),
        "콘텐츠", Map.of(
            "안정성", 50,
            "유동성", 55,
            "수익성", 60,
            "성장성", 75,
            "인적투입 효율성", 65
        ),
        "플랫폼", Map.of(
            "안정성", 45,
            "유동성", 60,
            "수익성", 65,
            "성장성", 85,
            "인적투입 효율성", 55
        ),
        "커머스", Map.of(
            "안정성", 50,
            "유동성", 68,
            "수익성", 52,
            "성장성", 70,
            "인적투입 효율성", 60
        ),
        "IT", Map.of(
            "안정성", 60,
            "유동성", 70,
            "수익성", 65,
            "성장성", 75,
            "인적투입 효율성", 60
        ),
        "미디어", Map.of(
            "안정성", 55,
            "유동성", 58,
            "수익성", 63,
            "성장성", 68,
            "인적투입 효율성", 62
        ),
        "제조", Map.of(
            "안정성", 75,
            "유동성", 62,
            "수익성", 58,
            "성장성", 55,
            "인적투입 효율성", 45
        )
        
    );

    private static final Map<String, Integer> DEFAULT_AVG = Map.of(
        "안정성", 50,
        "유동성", 50,
        "수익성", 50,
        "성장성", 50,
        "인적투입 효율성", 50
    );

    public static int getAValue(String major, String subject) {
        return INDUSTRY_AVG
                .getOrDefault(major, DEFAULT_AVG)
                .getOrDefault(subject, 50);
    }
}
