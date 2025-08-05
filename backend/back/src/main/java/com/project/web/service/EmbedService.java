package com.project.web.service;

import com.project.web.dto.MatchResultDTO;

public interface EmbedService {

	Map<String, MatchResultDTO> getEmbeddingMatches(List<String> targetCols, Set<String> candidateCols);
	
	
}
