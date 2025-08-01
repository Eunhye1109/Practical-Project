package com.project.web.service;


import com.project.web.dto.FcDTO;


public interface CompanyService {

	FcDTO insertCompany(String userId, String corpName);

    FcDTO getCompanyList(String userId);

    FcDTO deleteCompany(String userId, String corpName);
}
