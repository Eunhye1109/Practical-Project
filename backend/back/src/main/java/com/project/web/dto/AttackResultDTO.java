package com.project.web.dto;

import java.util.List;
import java.util.Map;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AttackResultDTO {

	private List<RadarDTO> rader;
	private List<Map<String, Object>> AttackGraphData;
    private List<NewsDataDTO> newsData;

}


//  ROE,부채비율,유동비율,ROA (고정)  공격 전용 : 매출액 영업이익 순이익 매출액 성장률 순이익 성장률