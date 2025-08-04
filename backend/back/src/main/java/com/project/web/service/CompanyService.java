package com.project.web.service;


import com.project.web.dto.FcDTO;


public interface CompanyService {

	FcDTO insertCompany(String userId, String corpName, String u_comment);

    FcDTO getCompanyList(String userId);
    
    FcDTO updateComment(String userId, String corpName, String u_comment);

    FcDTO deleteCompany(String userId, String corpName);
}
