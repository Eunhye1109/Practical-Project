package com.project.web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import com.project.web.dto.ResponseDTO;
import com.project.web.dto.SearchResultDTO;
import com.project.web.service.SearchCacheService;
import com.project.web.service.SearchService;
import com.project.web.vo.SearchwordVO;

import io.swagger.v3.oas.annotations.Operation;


@RestController
@RequestMapping("/api/v1")
public class SearchController {

	@Autowired
	private SearchService searchService;
	@Autowired
	private SearchCacheService searchCacheService;

	@Operation(summary = "기업 보고서 출력")
    @GetMapping("/search/{corp_name}")
    public ResponseEntity<SearchResultDTO> search(@PathVariable("corp_name") String corpName) {
    	
    	// 만약 찾을 컬럼이 DB에 있다(if 3개월 이내 검색기록 있음)면 DB에 있는 값을 가져와라
        if (searchCacheService.existsValidCache(corpName)) {
            return ResponseEntity.ok(searchCacheService.getCachedResult(corpName)); // ✅ 캐시된 결과 바로 리턴
        }
        // 아니면 search 실행하고 save(DB 등록) 한 후 search한 값을 줘라
        SearchResultDTO result = searchService.search(corpName);  // ✅ 새로 fetch + 매핑 수행
        searchCacheService.save(corpName, result);                   // ✅ 캐시 저장 (최초 or 오래된 경우)
        return ResponseEntity.ok(result);
    }
	
	@Operation(summary = "검색 기록 등록")
	@PostMapping("/search/history")
	public ResponseEntity<ResponseDTO> hisInsert(@RequestBody SearchwordVO searchHis){
		ResponseDTO response = searchService.hisInsert(searchHis);
		return ResponseEntity.ok(response);
	}
}