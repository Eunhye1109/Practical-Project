package com.project.web.service;

import java.util.*;

import org.springframework.stereotype.Service;

import com.project.web.utils.FinancialUtils;
import com.project.web.vo.ColumnMatchVO;

@Service
public class FinancialRatioService {

    public Map<String, Map<String, String>> calculate(List<ColumnMatchVO> columns) {
        Map<String, Map<String, String>> result = new LinkedHashMap<>();

        Map<String, String> 순이익 = extract("순이익", columns);
        Map<String, String> 자본총계 = extract("자본총계", columns);
        Map<String, String> 영업이익 = extract("영업이익", columns);
        Map<String, String> 매출액 = extract("매출액", columns);
        Map<String, String> 부채총계 = extract("부채총계", columns);
        Map<String, String> 유동자산 = extract("유동자산", columns);
        Map<String, String> 유동부채 = extract("유동부채", columns);

        result.put("ROE", FinancialUtils.divide(순이익, 자본총계));
        result.put("영업이익률", FinancialUtils.divide(영업이익, 매출액));
        result.put("부채비율", FinancialUtils.divide(부채총계, 자본총계));
        result.put("유동비율", FinancialUtils.divide(유동자산, 유동부채));
        result.put("매출액순이익률", FinancialUtils.divide(순이익, 매출액));
        result.put("자기자본비율", FinancialUtils.divide(자본총계, FinancialUtils.sum(자본총계, 부채총계)));
        result.put("레버리지비율", FinancialUtils.divide(FinancialUtils.sum(자본총계, 부채총계), 자본총계));
        result.put("ROA", FinancialUtils.divide(순이익, FinancialUtils.sum(자본총계, 부채총계)));

        return result;
    }

    private Map<String, String> extract(String targetCol, List<ColumnMatchVO> list) {
        return list.stream()
            .filter(col -> col.getTargetCol().equals(targetCol))
            .findFirst()
            .map(ColumnMatchVO::getValues)
            .orElse(new HashMap<>());
    }
}
