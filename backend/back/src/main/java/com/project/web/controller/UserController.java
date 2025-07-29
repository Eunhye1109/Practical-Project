package com.project.web.controller;

import com.project.web.dto.UserDTO;
import com.project.web.service.UserService;
// import com.sun.org.apache.bcel.internal.generic.RETURN;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
public class UserController {

	@Autowired
	private UserService userService;
	
	@PostMapping("/signup")  //@RequestBody : 여러개
	public ResponseEntity<UserDTO> signup(@RequestBody UserDTO userdto){ // 내가 프론트한테 signup가방을 줄건데 UserDTO브랜드의 정보를 담아줘 난 그 다음걸 userdto라 할거야
		UserDTO dto = userService.signup(userdto); 
		return new ResponseEntity<>(dto,HttpStatus.OK);
	}
	
	
	
	@GetMapping("/login")
	public ResponseEntity<String> login(
	        @RequestParam("userId") String userId,
	        @RequestParam("userPw") String userPw) {

	    String token = userService.login(userId, userPw);

	    if (token != null) {
	        return ResponseEntity.ok(token);  // JWT 토큰 반환
	    } else {
	        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
	                             .body("Invalid credentials");
	    }
	}

	  // 🔹 토큰 인증 테스트 API (GET + Authorization 헤더)
    @GetMapping("/test-token")
    public ResponseEntity<String> testToken(@RequestHeader("Authorization") String authHeader) {
        String token = authHeader.replace("Bearer ", "");

        if (jwtUtil.validateToken(token)) {
            String userId = jwtUtil.getUserIdFromToken(token);
            return ResponseEntity.ok("Token valid for user: " + userId);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid token");
        }
    }
}
    	
    // 🔵 [GET] 아이디 중복 확인 (QueryParam: id)
 //   @GetMapping("/check_id")
 //   public ResponseEntity<Boolean> check_id(@RequestParam("id") String userId) {
    
    	
 //   }
}
