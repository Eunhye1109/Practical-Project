package com.project.web.service;

import com.project.web.dto.UserDTO;

public interface UserInfoService {

	UserDTO secession(String userId, String userPw);

}
