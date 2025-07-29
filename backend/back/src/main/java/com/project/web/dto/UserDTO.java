package com.project.web.dto;

import com.project.web.vo.UserVO;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserDTO {
	
	 private UserVO uservo;
	 private boolean success;
	 
}
