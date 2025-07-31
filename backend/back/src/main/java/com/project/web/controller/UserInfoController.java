package com.project.web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.project.web.dto.UserDTO;
import com.project.web.service.UserInfoService;

@RestController
@RequestMapping("/api/v1/info")
public class UserInfoController {


	@Autowired
	private UserInfoService userInfoService;

	
	@PostMapping("/secession/{userId}/{userPw}")
	public ResponseEntity<UserDTO> secession(@PathVariable("userId") String userId, @PathVariable("userPw") String userPw){
		UserDTO response = userInfoService.secession(userId,userPw);
		return new ResponseEntity<>(response,HttpStatus.OK);
	}
	
}
