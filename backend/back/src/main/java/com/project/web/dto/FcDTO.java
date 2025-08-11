package com.project.web.dto;

import java.util.List;

import com.project.web.vo.FcVO;

import lombok.Builder;
import lombok.Data;
import lombok.Singular;

@Data
@Builder
public class FcDTO {

    private String userId;
    private String corpName;
    private String u_comment;
    private String corpCode;
     // ✅ VO와 이름 일치

    @Singular("fc")            // ✅ 리스트 빌더 안정성 강화
    private List<FcVO> fcVOList;

    private Boolean success;
    private String message;
}
