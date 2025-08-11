package com.project.web.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.project.web.dto.SearchListDTO;
import com.project.web.dto.SearchListInsertDTO;
import com.project.web.mapper.SearchListMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SearchListServiceImpl implements SearchListService{


	private final SearchListMapper searchListMapper;
	private final SearchListApiClient searchListApiClient;

	
	@Override
    public List<SearchListDTO> searchList(String corpName, String userPurpose) {
        // 1) 캐시 조회 (DB → InsertDTO)
        List<SearchListInsertDTO> cached = searchListMapper.selectByCorpName(corpName);
        if (cached != null && !cached.isEmpty()) {
            return toViewDTOs(cached);        // ← 사용처(1): 프론트로 뿌리기 직전 변환
        }

        // 2) FastAPI 호출 (네트워크 → InsertDTO)
        List<SearchListInsertDTO> fromFastApi = searchListApiClient
                .fetchCompanySummaries(corpName, userPurpose);

        // 3) DB 저장 전 정리
        for (SearchListInsertDTO row : fromFastApi) {
            normalize(row);                    // ← 사용처(2): 저장 전에 값 보정
            searchListMapper.insertSearchResult(row);
        }

        // 4) 프론트 응답용으로 변환
        return toViewDTOs(fromFastApi);        // ← 사용처(3): 최종 반환
    }

    // 너가 붙여넣은 두 메서드를 여기 아래에 둔다
    private void normalize(SearchListInsertDTO dto) {
        if (dto.getLogoUrl() == null) dto.setLogoUrl("");
        if (dto.getMajor() == null) dto.setMajor("");
        if (dto.getCorpCode() == null) dto.setCorpCode("");
        if (dto.getCeoName() == null) dto.setCeoName("");
        if (dto.getEstablishDate() == null) dto.setEstablishDate("");
        if (dto.getKeywords() == null) dto.setKeywords(java.util.Collections.emptyList());
    }

    private List<SearchListDTO> toViewDTOs(List<SearchListInsertDTO> rows) {
        return rows.stream().map(src ->
            SearchListDTO.builder()
                .logoUrl(src.getLogoUrl())
                .corpName(src.getCorpName())
                .gptSummary(src.getGptSummary())
                .stockType(src.getStockType())
                .major(src.getMajor())
                .keywords(src.getKeywords())
                .corpCode(src.getCorpCode())
                .build()
        ).collect(java.util.stream.Collectors.toList());
    }
}



