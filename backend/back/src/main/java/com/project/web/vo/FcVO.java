package com.project.web.vo;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FcVO {
	    private String userId;
	    private String corpName;
	    private String uComment;
	    private String corpCode;
	    private String logoUrl;
	    private String gptSummary; 
	   
}
