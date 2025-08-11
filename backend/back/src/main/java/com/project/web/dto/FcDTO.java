package com.project.web.dto;


import java.util.List;

import com.project.web.vo.FcVO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FcDTO {
    private String userId;

    // ✅ corpCode/Name 동시 제공
    private String corpCode;
    private String corpName;

    // ✅ 응답 본문에 바로 포함
    private String logoUrl;
    private String gptSummary;
    private String uComment;

    private Boolean success;
    private String message;
    private List<FcVO> fcVOList;

}
