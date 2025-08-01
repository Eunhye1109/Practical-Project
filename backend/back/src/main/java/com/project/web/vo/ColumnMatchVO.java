package com.project.web.vo;

import java.util.Map;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ColumnMatchVO {
	
    private String targetCol;      // 대표 컬럼명
    private String matchedCol;     // 실제 원본 컬럼명
    private Map<String, String> values;          // 값 (null 가능)
}
