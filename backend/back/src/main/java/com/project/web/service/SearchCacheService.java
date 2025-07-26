package com.project.web.service;

import java.util.Map;

public interface SearchCacheService {

	 Object getCachedResult(String corpName);

	 boolean existsValidCache(String corpName);

	 void save(String corpName, Map<String, Object> result);

}
