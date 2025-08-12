package com.project.web.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface CorpLogoMapper {
    String findLogoUrlByName(@Param("corpName") String corpName);
}