package com.project.web.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface ReportPersistMapper {

    // freshness
    int countFreshHeader(@Param("corpCode") String corpCode);
    int countGraph(@Param("corpCode") String corpCode);

    // upserts
    int upsertHeader(Map<String,Object> param);
    int upsertInfoBox(Map<String,Object> param);      // XML: #{param.xxx}
    int upsertAiSummary(Map<String,Object> param);

    int upsertRadarBatch(@Param("corpCode") String corpCode,
            			@Param("list") List<Map<String, ?>> list);

    int upsertGraphBatch(@Param("corpCode") String corpCode,
                         @Param("list") List<Map<String,Object>> list);

    int mergeNewsBatch(@Param("corpCode") String corpCode,
            			@Param("list") List<Map<String, ?>> list);
    
    // SIGNAL
    int mergeSignal(Map<String,Object> param);        // XML: #{param.xxx}

    // selects
    Map<String,Object> selectHeader(@Param("corpCode") String corpCode);
    Map<String,Object> selectInfoBox(@Param("corpCode") String corpCode);
    List<Map<String,Object>> selectRadar(@Param("corpCode") String corpCode);
    Map<String,Object> selectAi(@Param("corpCode") String corpCode);
    List<Map<String,Object>> selectGraph(@Param("corpCode") String corpCode);
    List<Map<String,Object>> selectNews(@Param("corpCode") String corpCode);
    Map<String,Object> selectSignal(@Param("corpCode") String corpCode);
    
    int mergeKeywordBatch(@Param("corpCode") String corpCode,
            @Param("list") List<String> list);
    List<String> selectKeywords(@Param("corpCode") String corpCode);
    
}
