package com.project.web.controller;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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

	@PostMapping("/login")
	public ResponseEntity<UserDTO> login(@RequestBody UserVO request){
		UserDTO response = userService.login(request.getUserId(), request.getUserPw(), request.getRiskType());
		return new ResponseEntity<>(response, HttpStatus.OK);
	}

	@GetMapping("/check_id/{userId}")
	public ResponseEntity<UserDTO> checkId(@PathVariable("userId") String userId){
		UserDTO response = userService.checkId(userId);
		return new ResponseEntity<>(response, HttpStatus.OK);
	}
	
	
	
}
	
