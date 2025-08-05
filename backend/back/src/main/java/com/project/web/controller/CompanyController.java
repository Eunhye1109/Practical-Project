package com.project.web.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project.web.dto.FcDTO;
import com.project.web.service.CompanyServiceImpl;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/company")
public class CompanyController {
	
	@Autowired
	private CompanyServiceImpl companyService;
	
	@PostMapping
	public ResponseEntity<FcDTO> insertCompany(@RequestParam String userId,@RequestParam String corpName, @RequestParam String u_comment) {
		FcDTO response = companyService.insertCompany(userId, corpName, u_comment);
	    return new ResponseEntity<>(response, response.getSuccess() ? HttpStatus.CREATED : HttpStatus.BAD_REQUEST);
	}
	
	
	  // 조회
    @GetMapping("/{userId}")
    public ResponseEntity<FcDTO> getCompanyList(@PathVariable String userId) {
    	FcDTO result = companyService.getCompanyList(userId);
        return ResponseEntity.ok(result);
    }
    
     // 메모 수정
    @PatchMapping("/comment")
    public ResponseEntity<FcDTO> updateComment(@RequestParam String userId, @RequestParam String corpName, @RequestParam String u_comment) {
        FcDTO response = companyService.updateComment(userId, corpName, u_comment);
        return new ResponseEntity<>(response, response.getSuccess() ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
    }

    // 관심 기업 삭제
    @DeleteMapping("/{userId}/{corpName}")
    public ResponseEntity<FcDTO> deleteCompany(@PathVariable String userId, @PathVariable String corpName) {
        FcDTO response = companyService.deleteCompany(userId, corpName);
        return new ResponseEntity<>(response, response.getSuccess() ? HttpStatus.OK : HttpStatus.NOT_FOUND);
    }
}
