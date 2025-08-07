package com.project.web.service;

import java.util.List;

import com.project.web.dto.SearchListDTO;

public interface SearchListService {

	List<SearchListDTO> searchList(String corpName);

}
