package com.project.web.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
	
	
    private boolean success;
    private String message;
    private String userId;
    private String userPw;
	
    
    private String token;  // JWT 토큰 (로그인 성공 시에만)

	 
}
