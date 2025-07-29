package com.project.web.vo;

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
    private String targetCol;    // 대표 컬럼명 (예: 순이익, 영업이익)
}
