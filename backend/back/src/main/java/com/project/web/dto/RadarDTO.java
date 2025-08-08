package com.project.web.dto;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;

import lombok.Data;

@Data
@JsonPropertyOrder({"subject","A","B","fullMark"})
public class RadarDTO {
	private String subject;
    private int A; // 업계 평균
    private int B; // 해당 기업 값
    private int fullMark; // 100 고정
}
