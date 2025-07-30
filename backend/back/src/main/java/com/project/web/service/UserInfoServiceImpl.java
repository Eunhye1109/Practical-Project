package com.project.web.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.web.dto.UserDTO;
import com.project.web.mapper.UserInfoMapper;
import com.project.web.vo.UserVO;

@Service
public class UserInfoServiceImpl implements UserInfoService{
	
	@Autowired
	private UserInfoMapper userInfoMapper;

	@Override
	public UserDTO secession(UserVO request) {
		int ok = userInfoMapper.secession(request);
		
		if(ok == 0) {
			return UserDTO.builder()
					.message("회원탈퇴 실패")
					.success(false)
					.build();
		}
		return UserDTO.builder()
				.message("회원탈퇴 성공")
				.success(true)
				.build();
	}

}
