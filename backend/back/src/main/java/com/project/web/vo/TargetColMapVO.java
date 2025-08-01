package com.project.web.vo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TargetColMapVO {
    private Long targetColMapIdx;   // target_col_map_idx (PK)
    private String targetName;       // 대표 컬럼명
    private String matchedCol;      // 매핑된 실제 컬럼명
}
