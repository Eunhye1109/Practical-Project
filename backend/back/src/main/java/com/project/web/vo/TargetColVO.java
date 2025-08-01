package com.project.web.vo;

import java.sql.Timestamp;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TargetColVO {
    private Long targetColIdx;   // target_col_idx (PK)
    private String targetColName;    // 대표 컬럼명 (예: 순이익, 영업이익)
    private String description;
    private Timestamp createdAt;
    
}
