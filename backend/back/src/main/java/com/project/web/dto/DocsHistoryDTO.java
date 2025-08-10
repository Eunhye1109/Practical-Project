package com.project.web.dto;

import lombok.Data;

@Data
public class DocsHistoryDTO {

	private String corpCode;   // 기업코드
    private String name;       // 기업명
    private String intro;      // 기업소개(짧은 문장)
    private String logoUrl;    // 로고 URL
    private String viewedAt;   // ISO8601 (예: 2025-08-09T03:21:00Z)
}
