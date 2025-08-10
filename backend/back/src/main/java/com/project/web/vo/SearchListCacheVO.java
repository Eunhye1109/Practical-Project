package com.project.web.vo;

import lombok.Data;

@Data
public class SearchListCacheVO {
    private String corpName;
    private String logoUrl;
    private String major;
    private String keywordsJson; // JSON 문자열 (예: ["#반도체","#모바일"])
}
