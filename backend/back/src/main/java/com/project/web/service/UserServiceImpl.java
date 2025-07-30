package com.project.web.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.project.web.dto.UserDTO;
import com.project.web.mapper.UserMapper;
import com.project.web.vo.UserVO;

@Service
public class UserServiceImpl implements UserService {


    @Autowired
    private UserMapper usermapper;


    @Override
    public UserDTO signup(UserVO request) {
//        UserVO vo = userdto.getUservo();
//        usermapper.signup(vo);
    	
    	int ok = usermapper.signup(request);
    	
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

		UserVO ok = usermapper.login(vo);

    		
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
			            .build();

    }

}
