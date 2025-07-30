package com.project.web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.project.web.dto.UserDTO;
import com.project.web.service.UserInfoService;
import com.project.web.vo.UserVO;

@RestController
@RequestMapping("/api/v1/info")
public class UserInfoController {


	@Autowired
	private UserInfoService userInfoService;

	
	@PostMapping
	public ResponseEntity<UserDTO> secession(@RequestBody UserVO request){
		UserDTO response = userInfoService.secession(request);
		return new ResponseEntity<>(response,HttpStatus.OK);
	}
	
}
