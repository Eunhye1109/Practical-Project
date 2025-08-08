package com.project.web.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

import lombok.Data;

@Data
@JsonPropertyOrder({"subject","A","B","fullMark"})
public class RadarDTO {
	@JsonProperty("subject")
    private String subject;

    @JsonProperty("A")
    private int A; // 업계 평균

    @JsonProperty("B")
    private int B; // 해당 기업 값

    @JsonProperty("fullMark")
    private int fullMark; // 100 고정
}
