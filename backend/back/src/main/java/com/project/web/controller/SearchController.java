package com.project.web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import com.project.web.service.SearchCacheService;
import com.project.web.service.SearchService;

import java.util.*;

@RestController
@RequestMapping("/api/v1")
public class SearchController {

	@Autowired
	private SearchService searchService;

    @GetMapping("/search/{corp_name}")
    public ResponseEntity<?> search(@PathVariable String corpName) {
        if (SearchCacheService.existsValidCache(corpName)) {
            return ResponseEntity.ok(SearchCacheService.getCachedResult(corpName)); // ✅ 캐시된 결과 바로 리턴
        }

        Map<String, Object> result = searchService.search(corpName);  // ✅ 새로 fetch + 매핑 수행
        SearchCacheService.save(corpName, result);                   // ✅ 캐시 저장 (최초 or 오래된 경우)
        return ResponseEntity.ok(result);
    }
}