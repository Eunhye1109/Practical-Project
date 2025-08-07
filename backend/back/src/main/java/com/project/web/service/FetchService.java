package com.project.web.service;

import java.util.Map;

public interface FetchService {

	Map<String, Object> fetchColumns(String corpName, String userPurpose);
	
}
