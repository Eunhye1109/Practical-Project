package com.project.web.controller;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project.web.dto.UserDTO;
import com.project.web.service.UserService;
import com.project.web.vo.UpdateUserVO;
import com.project.web.vo.UserVO;
import io.swagger.v3.oas.annotations.Operation;
import com.project.web.vo.UserVO;

import com.project.web.vo.UserVO;

import io.swagger.v3.oas.annotations.Operation;


@RestController
@RequestMapping("/api/v1/auth")
public class UserController {

	@Autowired
	private UserService userService;
	@Operation(summary = "회원가입")
	@PostMapping("/signup")
	public ResponseEntity<UserDTO> signup(@RequestBody  UserVO request) {
    	UserDTO response = userService.signup(request);
	    return new ResponseEntity<>(response, HttpStatus.CREATED);
	}
	
	@Operation(summary = "로그인")
	@GetMapping("login")
	public ResponseEntity<UserDTO> login(@RequestParam String userId, @RequestParam String userPw){
		UserDTO response = userService.login(userId, userPw);
		return new ResponseEntity<>(response, HttpStatus.OK);
	}
	
	@Operation(summary = "아이디 중복확인")
	@GetMapping("check_id/{userId}")
	public ResponseEntity<UserDTO> checkId(@PathVariable("userId") String userId){
		UserDTO response = userService.checkId(userId);
		return new ResponseEntity<>(response, HttpStatus.OK);
	}

	
	@Operation(summary = "회원정보수정")
	@PatchMapping("/update")
	public ResponseEntity<UserDTO> updateUser(@RequestBody UpdateUserVO request) {
	    UserDTO result = userService.updateUser(request);
	    return new ResponseEntity<>(result, result.isSuccess() ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
	}
	
	@Operation(summary = "회원 정보 조회")
	@GetMapping("/info/{userId}")
	public ResponseEntity<UserDTO> getUserInfo(@PathVariable String userId) {
	    UserDTO result = userService.getUserInfo(userId);
	    return new ResponseEntity<>(result, result.isSuccess() ? HttpStatus.OK : HttpStatus.NOT_FOUND);
	}

}
	
