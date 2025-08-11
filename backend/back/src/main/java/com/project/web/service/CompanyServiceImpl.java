package com.project.web.service;

import org.springframework.stereotype.Service;

import com.project.web.dto.FcDTO;
import com.project.web.mapper.CompanyMapper;
import com.project.web.mapper.SearchListMapper;
import com.project.web.vo.FcVO;

@Service
@lombok.RequiredArgsConstructor
public class CompanyServiceImpl implements CompanyService {

	private final CompanyMapper companyMapper;
	private final SearchListMapper searchListMapper;

	@Override
	public FcDTO insertCompany(String userId, String corpCode, String uComment) {
	    if (corpCode == null || corpCode.isBlank()) {
	        return FcDTO.builder().success(false).message("corpCode는 필수입니다.").build();
	    }

	    FcVO req = new FcVO();
	    req.setUserId(userId);
	    req.setCorpCode(corpCode);     // ✅ corpCode 세팅
	    req.setUComment(uComment);

	    // corpCode로 캐시에서 기업 정보 보강
	    var info = searchListMapper.selectInfoBaseByCorpCode(corpCode);
	    if (info != null) {
	        if (req.getCorpName() == null || req.getCorpName().isBlank()) req.setCorpName(info.getCorpName()); // ✅ 이름 보강
	        if (req.getLogoUrl()  == null || req.getLogoUrl().isBlank())  req.setLogoUrl(info.getLogoUrl());   // ✅ 로고 보강
	        if (req.getGptSummary()== null || req.getGptSummary().isBlank()) req.setGptSummary(info.getGptSummary()); // ✅ 소개 보강
	    }

	    int ok = companyMapper.insertCompany(req);
	    if (ok == 0) return FcDTO.builder().success(false).message("관심기업 등록 실패").build();

	    // ✅ 응답에는 진짜 corpName/로고/소개와 corpCode를 모두 담아 돌려준다
	    return FcDTO.builder()
	            .success(true)
	            .userId(userId)
	            .corpCode(corpCode)
	            .corpName(req.getCorpName())    // 코드가 아니라 보강된 '회사명'
	            .logoUrl(req.getLogoUrl())
	            .gptSummary(req.getGptSummary())
	            .uComment(uComment)
	            .message("등록 완료")
	            .build();
	}

	@Override
	public FcDTO getCompanyList(String userId) {
	    var list = companyMapper.selectCompany(userId);
	    if (list == null || list.isEmpty()) {
	        return FcDTO.builder()
	                .success(false)
	                .message("관심기업 없음")
	                .build();
	    }
	    return FcDTO.builder()
	            .success(true)
	            .userId(userId)        // 선택
	            .fcVOList(list)        // ✅ 리스트 포함
	            .message("조회 성공")
	            .build();
	}


	// 삭제
	@Override
	public FcDTO deleteCompany(String userId, String corpCode) {
		int result = companyMapper.deleteCompany(userId, corpCode);
		if (result == 0)
			return FcDTO.builder().success(false).message("삭제 실패/대상 없음").build();
		return FcDTO.builder().success(true).userId(userId).corpName(corpCode).message("✅ 삭제 완료").build();
	}

	// 메모 수정 (uComment 통일)
	@Override
	public FcDTO updateComment(String userId, String corpCode, String uComment) {
		int result = companyMapper.updateComment(userId, corpCode, uComment);
		if (result == 0)
			return FcDTO.builder().success(false).message("메모 수정 실패/대상 없음").build();
		return FcDTO.builder().success(true).userId(userId).corpName(corpCode).uComment(uComment).message("✅ 수정 완료")
				.build();
	}

	private boolean isBlank(String s) {
		return s == null || s.isBlank();
	}
}
