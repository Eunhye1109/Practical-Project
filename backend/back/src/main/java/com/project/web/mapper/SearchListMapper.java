package com.project.web.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.project.web.dto.SearchListDTO;

@Mapper
public interface SearchListMapper {
	void insertSearchResult(SearchListDTO dto);
	List<SearchListDTO> selectByCorpName(String corpName);
}
