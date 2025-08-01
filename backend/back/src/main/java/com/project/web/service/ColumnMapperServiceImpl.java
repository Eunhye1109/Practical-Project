package com.project.web.service;

import org.springframework.stereotype.Service;

import com.project.web.mapper.TargetColMapMapper;
import com.project.web.vo.TargetColMapVO;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.util.*;

@Slf4j
@Service
@RequiredArgsConstructor
public class ColumnMapperServiceImpl implements ColumnMapperService {

    private final TargetColMapMapper targetColMapMapper;

    @Override
    public String findMappedCol(String targetCol, Set<String> candidateCols) {
    	log.debug("🔍 매핑 조회 시도: targetCol={}, 후보군={}", targetCol, candidateCols);

        String result = targetColMapMapper.findMappedCol(targetCol, candidateCols);

        if (result != null) {
            log.debug("✅ 매핑 결과 발견: {} → {}", targetCol, result);
        } else {
            log.debug("❌ 매핑 결과 없음: {}", targetCol);
        }

        return result;
    }

    @Override
    public void saveMapping(String targetName, String matchedCol, double similarity) {
    	if (similarity < 0.8) {
            log.debug("⛔ 유사도({})가 기준 미달로 저장 생략: targetCol={}, matchedCol={}", similarity, targetName, matchedCol);
            return;
        }
    	String existing = targetColMapMapper.findMappedCol(targetName, Set.of(matchedCol));
	    if (existing != null) {
	        log.debug("🟡 이미 존재하는 매핑: target={}, matchedCol={}", targetName, matchedCol);
	        return;
	    }
    	TargetColMapVO vo = TargetColMapVO.builder()
            .targetName(targetName)
            .matchedCol(matchedCol)
            .similarity(similarity)
            .build();

        targetColMapMapper.saveMapping(vo);
        log.debug("✅ 매핑 저장 완료: {}", vo);
    }
}

