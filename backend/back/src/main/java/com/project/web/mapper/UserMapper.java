package com.project.web.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.project.web.vo.UserVO;

@Mapper
public interface UserMapper {
	
	int signup(UserVO request);     // 회원가입 (DB저장)
	
	UserVO check_id(String userId);   // 아이디 중복 확인
	
	
	
}

