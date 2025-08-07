package com.project.web.dto;

import java.util.List;

import lombok.Data;

@Data
public class SearchListDTO {

	private String corpCode;
	private String corpName;       // 회사명
    private String ceoName;        // 대표자
    private String stockType;      // 상장 여부 (상장 / 비상장)
    private String establishDate;  // 설립일 (YYYY-MM-DD 형식)
//    private String address;        // 주소
//    private String bizNo;          // 사업자등록번호
//    private List<String> affiliates;   // 계열사 목록
    private List<String> keywords;     // GPT 요약 키워드 리스트
    private String gptSummary;         // GPT 한 줄 요약
    
//    private String 총인원_수;     // EMPLOYEE_CNT
}

