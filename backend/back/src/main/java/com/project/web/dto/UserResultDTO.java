package com.project.web.dto;

import com.project.web.vo.UserVO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserResultDTO {

	private UserVO userInfo;
    private boolean success;
    private String message;
}
