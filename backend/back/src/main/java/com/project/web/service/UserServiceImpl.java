package com.project.web.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.project.web.dto.UserDTO;
import com.project.web.mapper.UserMapper;
import com.project.web.vo.UpdateUserVO;
import com.project.web.vo.UserVO;

@Service
public class UserServiceImpl implements UserService {


    @Autowired
    private UserMapper userMapper;


    @Override
    public UserDTO signup(UserVO request) {
//        UserVO vo = userdto.getUservo();
//        usermapper.signup(vo);
    	
    	int ok = userMapper.signup(request);
    	
    	// if usermapper.signup(userdto) = 0일때??? 실패
	    	if(ok == 0) {
	    		return UserDTO.builder()
	    				.success(false)
	    				.message("회원가입 실패")
	    				.build();
	    	}
	    	
        return UserDTO.builder()
//                .uservo() success(true)만 주면 괜찮
                .success(true)
                .message("회원가입 성공")
                .userId(request.getUserId())
                .build();
    }

    @Override
    public UserDTO login(String userId, String userPw) {
    	UserVO vo = new UserVO();
    	vo.setUserId(userId);
    	vo.setUserPw(userPw);
    	
    	System.out.println("userId: " + userId + ", userPw: " + userPw);

		UserVO ok = userMapper.login(vo);

	    	if(ok == null) {
	    		return UserDTO.builder()
	    				.success(false)
	    				.message("Id 또는 Pw가 틀렸습니다.")
	    				.build();
	    	}
    	
			    return UserDTO.builder()
			            .success(true)
			            .message("로그인 성공")
			            .userId(userId)
			            .userPw(userPw)
			            .build();

    }

	@Override
	public UserDTO checkId(String userId) {
		String vo =userMapper.checkId(userId);
		
		if (vo != null) {
			return UserDTO.builder()
					.message(userId+"는 사용중인 ID입니다.")
					.success(false)
					.build();
		}
		return UserDTO.builder()
				.message(userId+"는 사용가능한 ID입니다.")
				.success(true)
				.build();
	}
	
	@Override
	public UserDTO updateUser(UpdateUserVO request) {
	    // VO → Mapper에 그대로 전달
	    int result = userMapper.updateUser(request);

	    if (result == 0) {
	        return UserDTO.builder()
	                .success(false)
	                .message("❌ 회원 정보 수정에 실패했습니다.")
	                .build();
	    }

	    return UserDTO.builder()
	            .success(true)
	            .message("✅ 회원 정보가 성공적으로 수정되었습니다.")
	            .userId(request.getUserId())
	            .build();
	}
}
