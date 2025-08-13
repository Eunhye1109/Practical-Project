package com.project.web.dto;


import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
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
