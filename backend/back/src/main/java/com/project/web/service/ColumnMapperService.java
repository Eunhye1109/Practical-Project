package com.project.web.service;

import java.util.Set;

public interface ColumnMapperService {

	public String findMappedCol(String targetCol, Set<String> rawCols);
	
	public void saveMapping(String targetName, String matchedCol, double similarity);
	
}
