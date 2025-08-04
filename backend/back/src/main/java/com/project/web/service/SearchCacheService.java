package com.project.web.service;


import com.project.web.dto.SearchResultDTO;

public interface SearchCacheService {

	// 캐싱한 값들이 있냐
	boolean existsValidCache(String corpName);
	 // 캐싱했던 값들을 가져와라
	SearchResultDTO getCachedResult(String corpName);
	 // 캐싱한거 세이브해라
	SearchResultDTO save(String corpName, SearchResultDTO result);

}
