package com.project.web.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.project.web.dto.SearchListInsertDTO;
import com.project.web.vo.InfoBaseVO;
import com.project.web.vo.SearchListCacheVO;

@Mapper
public interface SearchListMapper {
	void insertSearchResult(SearchListInsertDTO dto);
	List<SearchListInsertDTO> selectByCorpName(String corpName);
	SearchListCacheVO selectHeaderByCorpCode(@Param("corpCode") String corpCode);
	InfoBaseVO selectInfoBaseByCorpCode(@Param("corpCode") String corpCode); // ← 추가

}
