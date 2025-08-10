package com.project.web.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.project.web.dto.SearchListDTO;
import com.project.web.vo.SearchListCacheVO;

@Mapper
public interface SearchListMapper {
	void insertSearchResult(SearchListDTO dto);
	List<SearchListDTO> selectByCorpName(String corpName);
	SearchListCacheVO selectHeaderByCorpCode(@Param("corpCode") String corpCode);
	SearchListCacheVO selectInfoBaseByCorpCode(@Param("corpCode") String corpCode); // ← 추가

}
