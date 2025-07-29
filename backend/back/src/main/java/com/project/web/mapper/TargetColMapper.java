package com.project.web.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface TargetColMapper {
	
//	@Select("SELECT target_col FROM target_col")
    List<String> selectAllTargetCols();  // 대표컬럼
}
