package com.project.web.service;

import java.util.List;
import java.util.Map;
import java.util.Set;

public interface EmbedService {

	Map<String, String> getEmbeddingMatches(List<String> targetCols, Set<String> candidateCols);
	
	
}
