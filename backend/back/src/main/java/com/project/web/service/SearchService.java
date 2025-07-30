package com.project.web.service;


import com.project.web.dto.SearchResultDTO;

public interface SearchService {

	// 찾고자 하는 컬럼을 서치해라
	SearchResultDTO search(String corpName);

}
