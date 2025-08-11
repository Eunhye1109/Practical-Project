package com.project.web.dto;


import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SearchListInsertDTO {

    private String corpName;       // CORP_NAME
    private String stockType;      // STOCK_TYPE
    private List<String> keywords;   // KEYWORDS_JSON
    private String major;          // MAJOR
    private String corpCode;       // CORP_CODE
    private String gptSummary;     // GPT_SUMMARY
    private String logoUrl;        // LOGO_URL
    private String ceoName;        // CEO_NAME
    private String establishDate;  // ESTABLISH_DATE
}
