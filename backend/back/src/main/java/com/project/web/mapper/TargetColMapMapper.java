package com.project.web.mapper;

import java.util.Set;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.project.web.vo.TargetColMapVO;

@Mapper
public interface TargetColMapMapper {
	
    String findMappedCol(@Param("targetName") String targetCol, @Param("candidateCols") Set<String> candidateCols);
    
    void saveMapping(TargetColMapVO vo);
}
