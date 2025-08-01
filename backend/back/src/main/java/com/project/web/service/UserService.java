package com.project.web.service;

import com.project.web.dto.UserDTO;
import com.project.web.vo.UpdateUserVO;
import com.project.web.vo.UserVO;

public interface UserService {

	public UserDTO signup(UserVO request);

	public UserDTO login(String userId, String userPw);

	public UserDTO checkId(String userId);

	public UserDTO updateUser(UpdateUserVO request);
	
}
