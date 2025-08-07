package com.project.web.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.project.web.vo.TargetColVO;

@Mapper
public interface TargetColMapper {
	
    List<TargetColVO> selectAllTargetCols();  // 대표컬럼
}
