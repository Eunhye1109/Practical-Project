package com.project.web.vo;

import java.sql.Timestamp;

import lombok.Data;


@Data
public class UserVO {

	
	    private String userId;
	    private String userPw;
	    private String userPhone;
	    private String userJob;
	    private String userPurpose;
	    private String riskType;
	    private Timestamp joinedAt;
	    private String termsAgree;

}
