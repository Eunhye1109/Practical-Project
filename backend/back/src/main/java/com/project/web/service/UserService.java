package com.project.web.service;

import com.project.web.dto.UserDTO;
import com.project.web.vo.UserVO;

public interface UserService {

	public UserDTO signup(UserVO request);

	public String login(String userId, String userPw);
	
}
