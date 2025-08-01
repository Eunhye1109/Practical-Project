package com.project.web.service;


import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;
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
        List<SearchCacheVO> cached = searchCacheMapper.getCachedResult(corpName);
        List<ColumnMatchVO> columns = cached.stream()
    		.filter(Objects::nonNull) // 🔒 null 방지
            .map(vo -> ColumnMatchVO.builder()
                .targetCol(vo.getColName())
                .matchedCol(null)  // 캐시에는 matchedCol 없으므로 생략
                .value(vo.getColValue())
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
            SearchCacheVO vo = SearchCacheVO.builder()
                .corpName(corpName)
                .colName(col.getTargetCol())
                .colValue(col.getValue())
                .cachedAt(now)
                .build();
            searchCacheMapper.save(vo);
        }
        return result;
    }
}