package com.project.web.dto;

import java.util.List;
import java.util.Map;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class MixedTypeResultDTO {

    private List<RadarDTO> rader;
    private List<Map<String, Object>> MixedTyperGraphData;
    private List<NewsDataDTO> newsData;


}

//ROE,부채비율,유동비율,ROA (고정) 균형비율(???????) 매출액순이익률 영업이익률