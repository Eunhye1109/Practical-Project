package com.project.web.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.project.web.vo.SearchCacheVO;

@Mapper
public interface SearchCacheMapper {
	
    boolean existsValidCache(@Param("corpCode") String corpCode);
    
    List<SearchCacheVO> getCachedResult(@Param("corpCode") String corpCode);
    
    void save(SearchCacheVO vo);
}
