package com.project.web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.project.web.dto.UserDTO;
import com.project.web.service.UserInfoService;

import io.swagger.v3.oas.annotations.Operation;

@RestController
@RequestMapping("/api/v1/info")
public class UserInfoController {


	@Autowired
	private UserInfoService userInfoService;

	@Operation(summary = "유저 정보 삭제")
	@PostMapping("/secession/{userId}/{userPw}")
	public ResponseEntity<UserDTO> secession(@PathVariable("userId") String userId, @PathVariable("userPw") String userPw){
		UserDTO response = userInfoService.secession(userId,userPw);
		return new ResponseEntity<>(response,HttpStatus.OK);
	}
	
	@Operation(summary = "유저 정보 조회")
	@GetMapping("/get_userInfo")
	public ResponseEntity<UserDTO> getUserInfo(@RequestParam("userId") String userId){
		UserDTO response = userInfoService.getUserInfo(userId);
		return new ResponseEntity<>(response,HttpStatus.OK);
	}
}
