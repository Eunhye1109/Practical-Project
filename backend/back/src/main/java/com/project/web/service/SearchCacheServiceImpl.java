package com.project.web.service;


import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

import org.springframework.stereotype.Service;

import com.project.web.dto.SearchResultDTO;
import com.project.web.mapper.SearchCacheMapper;
import com.project.web.vo.ColumnMatchVO;
import com.project.web.vo.SearchCacheVO;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SearchCacheServiceImpl implements SearchCacheService {

    private final SearchCacheMapper searchCacheMapper;

    @Override
    public boolean existsValidCache(String corpName) {
        return searchCacheMapper.existsValidCache(corpName);
    }

    @Override
    public SearchResultDTO getCachedResult(String corpName) {
        List<SearchCacheVO> cachedList  = searchCacheMapper.getCachedResult(corpName);
     // targetCol별로 연도별 값 모으기
        Map<String, Map<String, String>> grouped = new LinkedHashMap<>();
        for (SearchCacheVO vo : cachedList) {
            if (vo == null || vo.getColName() == null) continue;
            String year = vo.getYears(); // ← DB에서 연도 필드 가져와야 함
            String col = vo.getColName();
            String val = vo.getColValue();

            grouped.computeIfAbsent(col, k -> new LinkedHashMap<>()).put(year, val);
        }

        // ColumnMatchVO로 변환
        List<ColumnMatchVO> columns = grouped.entrySet().stream()
            .map(entry -> ColumnMatchVO.builder()
                .targetCol(entry.getKey())
                .matchedCol(null) // 캐시에는 matchedCol 저장 안 하므로 null
                .values(entry.getValue())
                .build())
            .toList();

        return SearchResultDTO.builder()
            .corpName(corpName)
            .columns(columns)
            .build();
    }

    @Override
    public SearchResultDTO save(String corpName, SearchResultDTO result) {
    	Timestamp  now = Timestamp.valueOf(LocalDateTime.now());
    	 for (ColumnMatchVO col : result.getColumns()) {
             String colName = col.getTargetCol();
             Map<String, String> yearValues = col.getValues();

             if (yearValues == null) continue;
             for (Map.Entry<String, String> entry : yearValues.entrySet()) {
            	 String year = entry.getKey();
                 String value = entry.getValue();
                 SearchCacheVO vo = SearchCacheVO.builder()
                     .corpName(corpName)
                     .colName(colName)
                     .colValue(value)
                     .years(year)   // ← 연도 저장
                     .cachedAt(now)
                     .build();
                 searchCacheMapper.save(vo);
             }
         }
         return result;
    }
}