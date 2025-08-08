package com.project.web.vo;

import java.time.LocalDateTime;

import lombok.Data;


@Data
public class FcVO {
	  	private Long fc_idx; 
	    private String userId;
	    private String corpName;
	    private LocalDateTime createdAt;
	    private String u_comment;
	    private String corpCode;
	   
}
