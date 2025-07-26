package com.project.web.service;

import java.util.Map;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SearchCacheServiceImpl implements SearchCacheService {

	@Override
	public Object getCachedResult(String corpName) {
		return null;
	}

	@Override
	public boolean existsValidCache(String corpName) {
		return false;
	}

	@Override
	public void save(String corpName, Map<String, Object> result) {
		
	}

}
