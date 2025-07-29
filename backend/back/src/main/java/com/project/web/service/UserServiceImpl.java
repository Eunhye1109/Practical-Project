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
    public UserDTO signup(UserDTO userdto) {
//        UserVO vo = userdto.getUservo();
//        usermapper.signup(vo);
    	int ok = usermapper.signup(userdto);
        // if usermapper.signup(userdto) = 0일때??? 실패
        return UserDTO.builder()
//                .uservo() success(true)만 주면 괜찮
                .success(true)
                .build();
    }

    @Override
    public String login(String userId, String userPw) {
        UserVO user = usermapper.check_id(userId);

        if (user == null) return null;

        if (userPw.equals(user.getUserPw())) {
            return jwtUtil.generateToken(userId);
        }

        return null;
    }

    
}
