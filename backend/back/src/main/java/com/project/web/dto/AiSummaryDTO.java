package com.project.web.dto;


import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AiSummaryDTO {
    private String emotion; // 긍정/부정
    private String summary;
}
