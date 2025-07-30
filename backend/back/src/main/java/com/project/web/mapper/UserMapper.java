package com.project.web.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.project.web.vo.UserVO;

@Mapper
public interface UserMapper {
	
	int signup(UserVO request);     // 회원가입 (DB저장)
	
	UserVO login(UserVO vo);   
	
	
	
}
//@Param("userId")String userId, @Param("userPw")String userPw