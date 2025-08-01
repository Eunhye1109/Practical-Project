package com.project.web.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.web.dto.FcDTO;
import com.project.web.mapper.CompanyMapper;
import com.project.web.vo.FcVO;

@Service
public class CompanyServiceImpl implements CompanyService {

    @Autowired
    private CompanyMapper companyMapper;

    @Override
    public FcDTO insertCompany(String userId, String corpName) {
        // 1. VO 객체 생성 및 값 설정
        FcVO request = new FcVO();
        request.setUserId(userId);
        request.setCorpName(corpName);

        // 2. Mapper 호출
        int result = companyMapper.insertCompany(request);

        // 3. 결과 처리
        if (result == 0) {
            return FcDTO.builder()
                    .success(false)
                    .message("관심기업 등록에 실패했습니다.")
                    .build();
        }

        return FcDTO.builder()
                .userId(userId)
                .corpName(corpName)
                .success(true)
                .message("🎉 관심기업에 등록되었습니다!")
                .build();
    }
    @Override
    public FcDTO getCompanyList(String userId) {
        List<FcVO> voList = companyMapper.selectCompany(userId);

        if (voList == null || voList.isEmpty()) {
            return FcDTO.builder()
                    .success(false)
                    .message("관심기업이 존재하지 않습니다.")
                    .build();
        }

        return FcDTO.builder()
                .fcVOList(voList)
                .success(true)
                .message("조회 성공")
                .build();
    }

    @Override
    public FcDTO deleteCompany(String userId, String corpName) {
        int result = companyMapper.deleteCompany(userId, corpName);

        if (result == 0) {
            return FcDTO.builder()
                    .success(false)
                    .message("❌ 관심기업에 해당 기업이 존재하지 않거나 삭제에 실패했습니다.")
                    .build();
        }

        return FcDTO.builder()
                .userId(userId)
                .corpName(corpName)
                .success(true)
                .message("✅ 관심기업에서 삭제되었습니다.")
                .build();
    }

	
}
