package com.project.web.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.project.web.vo.SearchCacheVO;

@Mapper
public interface SearchCacheMapper {
    boolean existsValidCache(@Param("corpName") String corpName);
    
    List<SearchCacheVO> getCachedResult(@Param("corpName") String corpName);
    
    void save(SearchCacheVO vo);
}
