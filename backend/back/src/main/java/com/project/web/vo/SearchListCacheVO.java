package com.project.web.vo;

import lombok.Data;

@Data
public class SearchListCacheVO {
    private String corpName;
    private String logoUrl;
    private String major;
    private String keywordsJson;

    private String ceoName;
    private String stockType;
    private String establishDate;
    private String gptSummary;
}

