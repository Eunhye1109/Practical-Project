package com.project.web.service;


import com.project.web.dto.FcDTO;


public interface CompanyService {

	FcDTO insertCompany(String userId, String corpCode, String uComment);

    FcDTO getCompanyList(String userId);
    
    FcDTO updateComment(String userId, String corpCode, String uComment);

    FcDTO deleteCompany(String userId, String corpCode);
}
