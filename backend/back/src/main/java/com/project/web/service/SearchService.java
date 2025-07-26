package com.project.web.service;

<<<<<<< HEAD

import com.project.web.dto.SearchResultDTO;

public interface SearchService {

	// 찾고자 하는 컬럼을 서치해라
	SearchResultDTO search(String corpName);
=======
import java.util.Map;

public interface SearchService {

	Map<String, Object> search(String corpName);
>>>>>>> ea024f8 (검색API + Fast API 모듈 사용로직 작성중)

}
