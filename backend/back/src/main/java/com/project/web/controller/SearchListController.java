package com.project.web.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project.web.dto.SearchListDTO;
import com.project.web.service.SearchListService;

import io.swagger.v3.oas.annotations.Operation;

@RestController
@RequestMapping("/api/v1")
public class SearchListController {
	
	@Autowired
	private SearchListService searchListService;

	@Operation(summary = "기업 리스트 출력 API")
	@PostMapping("/search/list")
	public ResponseEntity<List<SearchListDTO>> searchList(@RequestParam String corpName){
		List<SearchListDTO> CompanyList = searchListService.searchList(corpName);
		return new ResponseEntity<>(CompanyList,HttpStatus.OK);
	}
}
