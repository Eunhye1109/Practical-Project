package com.project.web.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.web.dto.SearchListDTO;
import com.project.web.mapper.SearchListMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SearchListServiceImpl implements SearchListService{


	private final SearchListMapper searchListMapper;
	private final SearchListApiClient searchListApiClient;

	
	@Override
	public List<SearchListDTO> searchList(String corpName, String userPurpose) {
		List<SearchListDTO> cachedList = searchListMapper.selectByCorpName(corpName);

		if (cachedList != null && !cachedList.isEmpty()) {
	        System.out.println("✅ 캐시에서 검색된 결과: " + cachedList.size() + "건");
	        return cachedList;
	    }

	    // ✅ 없으면 FastAPI 호출
		System.out.println("❌ 캐시 결과 없음 → FastAPI 호출");
	    List<SearchListDTO> fromFastApi = searchListApiClient.fetchCompanySummaries(corpName, userPurpose);

	    ObjectMapper om = new ObjectMapper();
	    for (SearchListDTO dto : fromFastApi) {
	        if (dto.getLogoUrl() == null) dto.setLogoUrl("");
	        if (dto.getMajor() == null) dto.setMajor("");
	        if (dto.getCorpCode() == null) dto.setCorpCode("");

	        try {
				dto.setKeywordsJson(dto.getKeywords() != null
				    ? om.writeValueAsString(dto.getKeywords())
				    : "[]");
			} catch (JsonProcessingException e) {
				e.printStackTrace();
			}

	        searchListMapper.insertSearchResult(dto);
	        System.out.println("📥 DB 저장: " + dto.getCorpName());
	    }

	    return fromFastApi;
	}


}
