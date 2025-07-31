package com.project.web.mapper;

import com.project.web.vo.UserVO;

public interface UserInfoMapper {

	int secession(String userId, String userPw);

	int secession(UserVO vo);

}
