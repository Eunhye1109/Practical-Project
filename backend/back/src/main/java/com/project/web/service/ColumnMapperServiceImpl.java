package com.project.web.service;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

import java.util.*;

@Service
@RequiredArgsConstructor
public class ColumnMapperServiceImpl implements ColumnMapperService {

    // TODO: 실제 JPA 레포지토리 주입
    // @Autowired private TargetColMapRepository repository;

    public String findMappedCol(String targetCol, Set<String> rawCols) {
        // TODO: JPA SELECT target_col_map WHERE target_col = ? AND matched_col IN (rawCols)
        Map<String, String> mock = Map.of(
            "영업이익", "영업이익",
            "순이익", "당기순이익(손실)",
            "ROE", "자기자본이익률"
        );
        String matched = mock.get(targetCol);
        return (matched != null && rawCols.contains(matched)) ? matched : null;
    }

    public void saveMapping(String targetCol, String matchedCol) {
        // TODO: JPA INSERT if not exists
        System.out.printf("[DB 저장] %s → %s%n", targetCol, matchedCol);
    }
}
