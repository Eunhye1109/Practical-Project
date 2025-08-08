package com.project.web.service;

import com.project.web.dto.UserDTO;
import com.project.web.dto.UserResultDTO;

public interface UserInfoService {

	UserDTO secession(String userId, String userPw);

	UserResultDTO getUserInfo(String userId);

}
