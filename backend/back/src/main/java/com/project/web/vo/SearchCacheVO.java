package com.project.web.vo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SearchCacheVO {
    private Long searchCacheIdx;       // search_cache_idx (PK)
    private String corpCode;
    private String corpName;           // 기업명
    private String colName;            // 컬럼명 (대표 컬럼명)
    private String colValue;           // 실제 값 (latestData.get(matchedCol))
    private String years;
    private Timestamp cachedAt;    // 캐시 저장 시점
}
