package com.project.web.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

@Mapper
public interface ReportPersistMapper {

    // freshness 체크
    int countFreshHeader(@Param("corpCode") String corpCode);
    int countGraph(@Param("corpCode") String corpCode);

    // upsert
    int upsertHeader(Map<String,Object> m);
    int upsertInfo(Map<String,Object> m);
    int upsertAiSummary(Map<String,Object> m);

    int upsertRadarBatch(@Param("corpCode") String corpCode,
                         @Param("list") List<Map<String,Object>> list);

    int upsertGraphBatch(@Param("corpCode") String corpCode,
                         @Param("list") List<Map<String,Object>> list);

    int mergeNewsBatch(@Param("corpCode") String corpCode,
                       @Param("list") List<Map<String,Object>> list);

    // select for getReport
    Map<String,Object> selectHeader(@Param("corpCode") String corpCode);
    Map<String,Object> selectInfo(@Param("corpCode") String corpCode);
    List<Map<String,Object>> selectRadar(@Param("corpCode") String corpCode);
    Map<String,Object> selectAi(@Param("corpCode") String corpCode);
    List<Map<String,Object>> selectGraph(@Param("corpCode") String corpCode);
    List<Map<String,Object>> selectNews(@Param("corpCode") String corpCode);
}
