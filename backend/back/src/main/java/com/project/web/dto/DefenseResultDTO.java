package com.project.web.dto;

import java.util.List;
import java.util.Map;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class DefenseResultDTO {

    private List<RadarDTO> rader;
    private List<Map<String, Object>> DefenseGraphData;
    private List<NewsDataDTO> newsData;

}


//ROE,부채비율,유동비율,ROA (고정) 자기자본비율 부채비율3년평균 유동비율3년평균 유동자산 유동부채 레버리지비율