package com.project.web.mapper;

import java.util.List;

import com.project.web.vo.SearchwordVO;

public interface SearchHisMapper {

	int insertHis(SearchwordVO searchHis);

	List<SearchwordVO> getHis(String userId);

}
