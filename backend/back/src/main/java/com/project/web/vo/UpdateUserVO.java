package com.project.web.vo;

import lombok.Data;

@Data
public class UpdateUserVO {
    private String userId;        // 식별자 (where 절 용)
    private String newUserId;        // 식별자 (where 절 용)
    private String userPw;        // 수정 가능
    private String userPhone;
    private String userJob;
    private String userPurpose;
    private String riskType;
}
