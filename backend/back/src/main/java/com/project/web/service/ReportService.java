package com.project.web.service;

import com.project.web.dto.SearchResultDTO;

public interface ReportService {

	/** corpCode 기준, 3개월 이내 레포트가 모두(헤더/인포/레이더/그래프/뉴스 일부) 존재하는지 */
    boolean existsValidReportDeep(String corpCode);

    /** DB에 있는 값으로 SearchResultDTO 재구성 */
    SearchResultDTO getReport(String corpCode);

    /** SearchResultDTO → 각 테이블 MERGE (INSERT/UPDATE) */
    void persistReport(SearchResultDTO dto);
}
