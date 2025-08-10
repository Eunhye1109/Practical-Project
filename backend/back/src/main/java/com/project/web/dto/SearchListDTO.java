package com.project.web.dto;

import java.util.List;

import lombok.Data;

@Data
public class SearchListDTO {

	private String logoUrl;
	private String corpName;       // 회사명
	private String gptSummary;         // GPT 한 줄 요약
    private String stockType;      // 상장 여부 (상장 / 비상장)
    private String major; // 주요 분야
    private List<String> keywords;     // GPT 요약 키워드 리스트
    private String corpCode;
    
    
 // DB 저장용
    private String keywordsJson;
}

