package com.project.web.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.web.mapper.TestMapper;
import com.project.web.model.TestModel;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api")
public class ApiController {
	
	 @Autowired
     TestMapper mapper;
	 
	@GetMapping("/hello")
    public Map<String, Object> hello() {
        Map<String, Object> map = new HashMap<>();
        // map.put("message", "Welcome. I am Spring boot Server");
        
        TestModel model = mapper.testSelect();
        map.put("id", model.getId());
        map.put("name", model.getName());
        map.put("email", model.getEmail());
        
        return map;
    }
	
	@PostMapping("/reMember")
	public ResponseEntity<TestModel> saveMember(@RequestBody TestModel member) {
	    System.out.println("받은 이름: " + member.getName());
	    mapper.testInsert(member);
	    
	    return ResponseEntity.ok(member);
	}
}
