package com.project.web.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.project.web.model.TestModel;

@Mapper
public interface TestMapper {
	
	public TestModel testSelect();
	public void testInsert(TestModel model);
	
}
