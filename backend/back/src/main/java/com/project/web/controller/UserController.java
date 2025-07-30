package com.project.web.controller;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project.web.dto.UserDTO;
import com.project.web.service.UserService;
import com.project.web.vo.UserVO;


@RestController
@RequestMapping("/api/v1/auth")
public class UserController {

	@Autowired
	private UserService userService;
	
	@PostMapping("/signup")
	public ResponseEntity<UserDTO> signup(@RequestBody  UserVO request) {
    	UserDTO response = userService.signup(request);
	    return new ResponseEntity<>(response, HttpStatus.CREATED);
	}

	@GetMapping("login")
	public ResponseEntity<UserDTO> login(@RequestParam String userId, @RequestParam String userPw){
		UserDTO response = userService.login(userId, userPw);
		return new ResponseEntity<>(response, HttpStatus.OK);
	}

}
	
