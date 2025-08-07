package com.project.web.service;


import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.project.web.dto.SearchResultDTO;
import com.project.web.mapper.SearchCacheMapper;
import com.project.web.utils.ConvertToFlatYearlyListUtil;
import com.project.web.vo.ColumnMatchVO;
import com.project.web.vo.SearchCacheVO;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SearchCacheServiceImpl implements SearchCacheService {

    private final SearchCacheMapper searchCacheMapper;

    @Override
    public boolean existsValidCache(String corpCode) {
        return searchCacheMapper.existsValidCache(corpCode);
    }

    @Override
    public SearchResultDTO getCachedResult(String corpCode) {
        List<SearchCacheVO> cachedList  = searchCacheMapper.getCachedResult(corpCode);
     // targetCol별로 연도별 값 모으기
        
        String corpName = cachedList.stream()
        		.map(SearchCacheVO::getCorpName)
    	        .filter(name -> name != null && !name.isBlank())
    	        .findFirst()
	        	.orElse("정보없음");
        
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
                .values(entry.getValue())
                .build())
            .toList();
        List<Map<String, Object>> flatList = ConvertToFlatYearlyListUtil.convert(columns, grouped);
        
        return SearchResultDTO.builder()
        		.corpCode(corpCode)
            .corpName(corpName)
            .columns(flatList)
            .build();
    }

    @Override
    public SearchResultDTO save(String corpCode, SearchResultDTO result) {
        Timestamp now = Timestamp.valueOf(LocalDateTime.now());
        String corpName = result.getCorpName();
        
        for (Map<String, Object> row : result.getColumns()) {
            String year = String.valueOf(row.get("year"));
            for (Map.Entry<String, Object> entry : row.entrySet()) {
                String colName = entry.getKey();
                if (colName.equals("year")) continue;

                Object val = entry.getValue();
                if (val == null) continue;

                SearchCacheVO vo = SearchCacheVO.builder()
                		.corpCode(corpCode)
                    .corpName(corpName)
                    .colName(colName)
                    .colValue(String.valueOf(val))
                    .years(year)
                    .cachedAt(now)
                    .build();


                searchCacheMapper.save(vo);
            }
        }

        return result;
    }

}