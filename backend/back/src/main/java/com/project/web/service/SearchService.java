package com.project.web.service;


import java.util.List;

import com.project.web.dto.ResponseDTO;
import com.project.web.dto.SearchResultDTO;
import com.project.web.vo.SearchwordVO;

public interface SearchService {

	// 찾고자 하는 컬럼을 서치해라
	SearchResultDTO search(String corpCode);

	ResponseDTO insertHis(SearchwordVO searchHis);

	List<SearchwordVO> getHis(String userId);

}
