package com.project.web.mapper;


import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.project.web.vo.FcVO;

@Mapper
public interface CompanyMapper {
    
    // 관심 기업 등록
    int insertCompany(FcVO request); 
    

    // 관심 기업 조회
    List<FcVO> selectCompany(String userId);
    
    // 메모 수정
    int updateComment(@Param("userId") String userId, @Param("corpName") String corpName, @Param("u_comment") String u_comment);

    
    // 관심 기업 삭제
    int deleteCompany(@Param("userId") String userId, @Param("corpName") String corpName);
}
