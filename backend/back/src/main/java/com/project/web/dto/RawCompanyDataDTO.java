package com.project.web.dto;

import java.util.Map;

import lombok.Data;

@Data
public class RawCompanyDataDTO {

	private Map<String, Map<String, Object>> yearData;  // ex: "2024" → { "매출액": "123", ... }
}
