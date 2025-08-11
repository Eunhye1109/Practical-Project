package com.project.web.service;

import java.util.List;
import java.util.Map;
import java.util.Set;

import com.project.web.dto.MatchResultDTO;

public interface EmbedService {

	Map<String, MatchResultDTO> getEmbeddingMatches(List<String> targetCols, Set<String> candidateCols);
	
	
}
