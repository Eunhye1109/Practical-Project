package com.project.web.service;

import com.project.web.dto.UserDTO;

public interface UserService {

	UserDTO signup(UserDTO userDTO);

	String login(String userId, String userPw);
	
}
