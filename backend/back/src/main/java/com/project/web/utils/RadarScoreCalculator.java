package com.project.web.utils;

import com.project.web.dto.RadarDTO;

import java.util.*;

public class RadarScoreCalculator {

    public static List<RadarDTO> calculateScores(List<Map<String, Object>> graphData) {
        if (graphData == null || graphData.size() < 2) return List.of();

        List<RadarDTO> result = new ArrayList<>();

        result.add(makeRadar("안정성", avgStability(graphData)));
        result.add(makeRadar("유동성", avgLiquidity(graphData)));
        result.add(makeRadar("수익성", avgProfitability(graphData)));
        result.add(makeRadar("성장성", calcGrowth(graphData)));
        result.add(makeRadar("인적투입 효율성", calcHRProductivity(graphData)));

        return result;
    }

    private static RadarDTO makeRadar(String subject, double score) {
        RadarDTO dto = new RadarDTO();
        dto.setSubject(subject);
        dto.setB((int) Math.round(score));
        dto.setA(50); // 업계 평균값: 추후 설정
        dto.setFullMark(100);
        return dto;
    }

    // 1. 안정성 = 평균[100 - (부채비율 / 3) + (자기자본비율 / 2)]
    private static double avgStability(List<Map<String, Object>> dataList) {
        double sum = 0;
        int count = 0;
        for (Map<String, Object> data : dataList) {
            double 부채비율 = getAsDouble(data, "부채비율");
            double 자기자본비율 = getAsDouble(data, "자기자본비율");
            sum += 100.0 - (부채비율 / 3.0) + (자기자본비율 / 2.0);
            count++;
        }
        return count > 0 ? sum / count : 0;
    }

    // 2. 유동성 = 평균[min(유동비율 / 2, 100)]
    private static double avgLiquidity(List<Map<String, Object>> dataList) {
        double sum = 0;
        int count = 0;
        for (Map<String, Object> data : dataList) {
            double 유동비율 = getAsDouble(data, "유동비율");
            sum += Math.min(유동비율 / 2.0, 100.0);
            count++;
        }
        return count > 0 ? sum / count : 0;
    }

    // 3. 수익성 = 평균[(영업이익률 * 0.6) + (ROE * 0.4)]
    private static double avgProfitability(List<Map<String, Object>> dataList) {
        double sum = 0;
        int count = 0;
        for (Map<String, Object> data : dataList) {
            double opMargin = getAsDouble(data, "영업이익률");
            double roe = getAsDouble(data, "ROE");
            sum += (opMargin * 0.6) + (roe * 0.4);
            count++;
        }
        return count > 0 ? sum / count : 0;
    }

    // 4. 성장성 = 0.3×매출성장률 + 0.4×영업이익성장률 + 0.3×순이익 CAGR
    private static double calcGrowth(List<Map<String, Object>> dataList) {
        int size = dataList.size();
        Map<String, Object> now = dataList.get(size - 1);
        Map<String, Object> prev = dataList.get(size - 2);
        Map<String, Object> old = dataList.get(0);

        double salesNow = getAsDouble(now, "매출액");
        double salesPrev = getAsDouble(prev, "매출액");
        double salesGrowth = salesPrev != 0 ? ((salesNow - salesPrev) / salesPrev) * 100 : 0;

        double opNow = getAsDouble(now, "영업이익");
        double opPrev = getAsDouble(prev, "영업이익");
        double opGrowth = opPrev != 0 ? ((opNow - opPrev) / opPrev) * 100 : 0;

        double profitStart = getAsDouble(old, "순이익");
        double profitEnd = getAsDouble(now, "순이익");
        double profitCAGR = (profitStart > 0 && profitEnd > 0 && size > 1) ?
            (Math.pow(profitEnd / profitStart, 1.0 / (size - 1)) - 1) * 100 : 0;

        return 0.3 * salesGrowth + 0.4 * opGrowth + 0.3 * profitCAGR;
    }

    // 5. 인적투입 효율성 = 매출성장률 - 인건비증가율
    private static double calcHRProductivity(List<Map<String, Object>> dataList) {
        int size = dataList.size();
        if (size < 2) return 0;

        Map<String, Object> now = dataList.get(size - 1);
        Map<String, Object> prev = dataList.get(size - 2);

        double salesNow = getAsDouble(now, "매출액");
        double salesPrev = getAsDouble(prev, "매출액");
        double salesGrowth = salesPrev != 0 ? ((salesNow - salesPrev) / salesPrev) * 100 : 0;

        double laborNow = getAsDouble(now, "평균인건비");
        double laborPrev = getAsDouble(prev, "평균인건비");
        double laborGrowth = laborPrev != 0 ? ((laborNow - laborPrev) / laborPrev) * 100 : 0;

        return salesGrowth - laborGrowth;
    }

    private static double getAsDouble(Map<String, Object> map, String key) {
        try {
            Object val = map.get(key);
            if (val instanceof Number) return ((Number) val).doubleValue();
            return Double.parseDouble(val.toString().replace(",", ""));
        } catch (Exception e) {
            return 0.0;
        }
    }
}
