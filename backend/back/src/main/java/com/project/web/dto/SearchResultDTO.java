package com.project.web.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;


@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SearchResultDTO {
    private String corpName;
    private String corpCode;
    private HeaderDTO header;
    private InfoBoxDTO infoBox;
    private List<RadarDTO> rader;
    private List<AiSummaryDTO> aiSumary;
    private List<SimilarCorpDTO> similarCorp;
    private List<Map<String, Object>> graphData;
    private List<NewsDataDTO> newsData;
    private String message;

}
