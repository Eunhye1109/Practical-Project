package com.project.web.service;

import java.util.*;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.project.web.dto.*;
import com.project.web.mapper.ReportPersistMapper;
import com.fasterxml.jackson.databind.ObjectMapper;


import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ReportServiceImpl implements ReportService {

    private final ReportPersistMapper mapper;
    private static final ObjectMapper MAPPER = new ObjectMapper();

    // ------------------------------------------------------------
    // 캐시 신선도: HEADER 90일 + GRAPH 존재
    // ------------------------------------------------------------
    @Override
    public boolean existsValidReportDeep(String corpCode) {
        return mapper.countFreshHeader(corpCode) > 0 && mapper.countGraph(corpCode) > 0;
    }

    // ------------------------------------------------------------
    // 저장 (FastAPI→DTO→DB)
    // ------------------------------------------------------------
    @Transactional
    @Override
    public void persistReport(SearchResultDTO dto) {
        final String corpCode = dto.getCorpCode();

        // ===== HEADER =====
        HeaderDTO h = dto.getHeader();
        String keywordsJoined = (h == null || h.getKeyword() == null)
                ? ""
                : String.join(",", h.getKeyword()); // DB가 VARCHAR이면 comma-join으로 저장

        mapper.upsertHeader(Map.of(
        		  "corpCode", corpCode,
        		  "corpName", nv(dto.getCorpName()),
        		  "logoUrl",  nv(h!=null ? h.getLogoUrl() : null),
        		  "major",    nv(h!=null ? h.getMajor()   : null)
        		));
     // KEYWORD 저장 (중복 방지 MERGE)
        if (h != null && h.getKeyword() != null && !h.getKeyword().isEmpty()) {
            // (선택) 완전 교체가 필요하면 먼저 삭제
            // mapper.deleteKeywords(corpCode);
            mapper.mergeKeywordBatch(corpCode, new ArrayList<>(h.getKeyword()));
        }

        // ===== INFOBOX (XML이 #{param.xxx}) =====
        if (dto.getInfoBox() != null) {
            var i = dto.getInfoBox();

            // 1) 숫자 컬럼(Long)로 정규화
            Long empCnt = toLong(i.getEmpCnt());  // "1,234" → 1234

            // 2) REV_ANN 은 DTO에 메서드가 없으므로 infoData[2]에서 추출
            String revAnn = null;
            if (i.getInfoData() != null && i.getInfoData().size() >= 3) {
                revAnn = nv(i.getInfoData().get(2));
            }

            // 3) CEO/상장유형/설립일은 JSON으로
            String infoJson;
            try {
                Map<String,String> json = new LinkedHashMap<>();
                if (nv(i.getCeoName())       != null) json.put("ceoName",       i.getCeoName());
                if (nv(i.getStockType())     != null) json.put("stockType",     i.getStockType());
                if (nv(i.getEstablishDate()) != null) json.put("establishDate", i.getEstablishDate());
                infoJson = MAPPER.writeValueAsString(json); // ← ObjectMapper 인스턴스
            } catch (Exception e) {
                infoJson = "{}";
            }

            mapper.upsertInfoBox(Map.of(
                "param", Map.of(
                    "corpCode",  corpCode,
                    "summary",   nv(i.getCorpSummary()),
                    "empCnt",    empCnt,     // NUMBER 컬럼
                    "revAnn",    revAnn,     // VARCHAR2 컬럼
                    "infoJson",  infoJson    // CLOB/VARCHAR2
                )
            ));
        }

        // ===== AI SUMMARY =====
        if (dto.getAiSumary() != null && !dto.getAiSumary().isEmpty()) {
            AiSummaryDTO ai = dto.getAiSumary().get(0);
            mapper.upsertAiSummary(Map.of(
                "corpCode", corpCode,
                "emotion",  nv(ai.getEmotion()),
                "summary",  nv(ai.getSummary())
            ));
        }

        // ===== RADAR (배치) =====
        if (dto.getRader()!=null && !dto.getRader().isEmpty()) {
            List<Map<String,String>> list = dto.getRader().stream().map(r -> {
                Map<String,String> m = new HashMap<>();
                m.put("subject",  nv(r.getSubject()));
                m.put("aValue",   nv(r.getA()));       // XML: #{r.aValue} → A_VALUE
                m.put("bValue",   nv(r.getB()));
                m.put("fullMark", nv(r.getFullMark()));
                return m;
            }).toList();
            mapper.upsertRadarBatch(corpCode, new ArrayList<>(list));
        }

        // ===== NEWS (배치) =====
        if (dto.getNewsData()!=null && !dto.getNewsData().isEmpty()) {
            List<Map<String,String>> list = dto.getNewsData().stream().map(n -> {
                Map<String,String> m = new HashMap<>();
                m.put("newsDate", nv(n.getDate()));    // XML: NEWS_DATE
                m.put("title",    nv(n.getTitle()));
                m.put("body",     nv(n.getBody()));
                m.put("link",     nv(n.getLink()));
                return m;
            }).toList();
            mapper.mergeNewsBatch(corpCode, new ArrayList<>(list));
        }

        // ===== SIGNAL (XML이 #{param.xxx}) =====
        if (dto.getSignalData()!=null) {
            mapper.mergeSignal(Map.of("param", Map.of(
                "corpCode",    corpCode,
                "signalScore", nv(dto.getSignalData().getSignalScore())
            )));
        }
        Map<String,Object> sig = mapper.selectSignal(corpCode);
        SignalDTO signal = (sig==null) ? null
            : SignalDTO.builder()
              .corpName(dto.getCorpName()) // DB에 없음 → DTO에서 보정
              .signalScore(getStr(sig, "SIGNAL_SCORE", "0"))
              .build();
    }

    // ------------------------------------------------------------
    // 조회 (DB→DTO 재조립)
    // ------------------------------------------------------------
    @Override
    public SearchResultDTO getReport(String corpCode) {
        Map<String,Object> h    = mapper.selectHeader(corpCode);
        Map<String,Object> i    = mapper.selectInfoBox(corpCode);
        Map<String,Object> ai   = mapper.selectAi(corpCode);
        List<Map<String,Object>> radar = mapper.selectRadar(corpCode);
        List<Map<String,Object>> graph = mapper.selectGraph(corpCode);
        List<Map<String,Object>> news  = mapper.selectNews(corpCode);
        Map<String,Object> sig  = safeSelectSignal(corpCode);
        List<String> keywords = mapper.selectKeywords(corpCode);

        // HeaderDTO
        HeaderDTO header = (h == null) ? null :
        	  HeaderDTO.builder()
        	      .corpName(getStr(h, "CORP_NAME", "정보없음"))
        	      .logoUrl(getStr(h, "LOGO_URL", ""))
        	      .major(getStr(h, "MAJOR", "정보없음"))
        	      .keyword(keywords == null ? List.of() : keywords)
        	      .build();

        // InfoBoxDTO (리스트 복원)
        InfoBoxDTO infoBox = null;
        if (i != null) {
        	String infoJson = getStr(i, "INFO_JSON", null);
        	String ceoName = null, stockType = null, establishDate = null;
        	try {
        	    if (infoJson != null && !infoJson.isBlank()) {
        	        Map<?, ?> m = MAPPER.readValue(infoJson, Map.class);
        	        ceoName       = asStr(m.get("ceoName"));
        	        stockType     = asStr(m.get("stockType"));      // <-- asStr 필요
        	        establishDate = asStr(m.get("establishDate"));
        	    }
        	} catch (Exception ignore) {}

            List<String> infoData = new ArrayList<>();
            infoData.add(nzd(ceoName, "정보없음"));
            infoData.add(nzd(stockType, "정보없음"));
            infoData.add(getStr(i, "REV_ANN", null));
            infoData.add(fmtNum(i.get("EMP_CNT")));
            infoData.add(nzd(establishDate, "정보없음"));

            infoBox = new InfoBoxDTO();
            infoBox.setCorpSummary(getStr(i, "SUMMARY", "정보없음"));
            infoBox.setInfoData(infoData);
        }

        // AiSummaryDTO
        List<AiSummaryDTO> aiList = (ai == null) ? List.of()
            : List.of(AiSummaryDTO.builder()
                        .emotion(getStr(ai, "EMOTION", "neutral"))
                        .summary(getStr(ai, "SUMMARY", ""))
                        .build());

        // RadarDTO list
        List<RadarDTO> radarList = (radar == null) ? List.of()
            : radar.stream().map(r -> RadarDTO.builder()
                    .subject(getStr(r, "SUBJECT", ""))
                    .A(getInt(r, "A_VALUE"))
                    .B(getInt(r, "B_VALUE"))
                    .fullMark(getInt(r, "FULL_MARK"))
                    .build())
              .collect(Collectors.toList());

        // NewsDataDTO list
        List<NewsDataDTO> newsList = (news == null) ? List.of()
            : news.stream().map(n -> NewsDataDTO.builder()
                    .date(getStr(n, "DATE", ""))
                    .title(getStr(n, "TITLE", ""))
                    .body(getStr(n, "BODY", ""))
                    .link(getStr(n, "LINK", ""))
                    .build())
              .collect(Collectors.toList());

        // SignalDTO
        SignalDTO signal = (sig == null) ? null
            : SignalDTO.builder()
                .corpName(getStr(sig, "CORP_NAME", ""))
                .signalScore(getStr(sig, "SIGNAL_SCORE", "0"))
                .build();

        return SearchResultDTO.builder()
            .corpCode(corpCode)
            .corpName(header != null ? header.getCorpName() : null)
            .header(header)
            .infoBox(infoBox)
            .aiSumary(aiList)
            .rader(radarList)
            .graphData(graph == null ? List.of() : graph) // 그대로 전달
            .newsData(newsList)
            .signalData(signal)
            .message("from-db")
            .build();
    }

    // ------------------------------------------------------------
    // 헬퍼
    // ------------------------------------------------------------
    private static String nv(Object o) {
        return (o == null) ? "" : String.valueOf(o);
    }

    private static String getStr(Map<?,?> m, String k, String def) {
        if (m == null) return def;
        Object v = m.get(k);
        return v == null ? def : Objects.toString(v, def);
    }

    private static Integer getInt(Map<?,?> m, String k) {
        Double d = getNum(m, k);
        return d == null ? null : d.intValue();
    }

    private static Double getNum(Map<?,?> m, String k) {
        if (m == null) return null;
        Object v = m.get(k);
        if (v == null) return null;
        if (v instanceof Number n) return n.doubleValue();
        try { return Double.valueOf(v.toString()); } catch (Exception e) { return null; }
    }

    private static String fmtNum(Object v) {
        if (v == null) return null;
        if (v instanceof Number n) return String.valueOf(n.longValue());
        return v.toString();
    }

    private static Long toLong(String s) {
        try { return s == null || s.isBlank() ? null : Long.valueOf(s.replaceAll("[^0-9-]", "")); }
        catch (Exception e) { return null; }
    }

    private static List<String> parseKeywords(String joined) {
        if (joined == null || joined.isBlank()) return List.of();
        // 콤마 저장 기준
        return Arrays.stream(joined.split(","))
                     .map(String::trim)
                     .filter(t -> !t.isEmpty())
                     .collect(Collectors.toList());
    }

    private Map<String,Object> safeSelectSignal(String corpCode) {
        try { return mapper.selectSignal(corpCode); }
        catch (Exception ignore) { return null; }
    }

    /** graphData(Map 리스트) → XML의 g.year, g.netProfit ... 키에 맞게 정규화 */
    private static List<Map<String,Object>> normalizeGraph(List<Map<String,Object>> src){
        if (src == null) return List.of();
        List<Map<String,Object>> out = new ArrayList<>();
        for (Map<String,Object> g : src) {
            Map<String,Object> m = new LinkedHashMap<>(); // 키 순서 유지
            m.put("year",         g.get("year"));
            m.put("netProfit",    g.get("netProfit"));
            m.put("opProfit",     g.get("operatingProfit"));
            m.put("totalDebt",    g.get("totalDebt"));
            m.put("totalEquity",  g.get("totalEquity"));
            m.put("revenue",      g.get("revenue"));
            m.put("curAssets",    g.get("currentAssets"));
            m.put("curDebts",     g.get("currentLiabilities"));
            m.put("avgSalary",    g.get("avgSalary"));
            m.put("empCnt",       g.get("empCnt"));
            m.put("dpsCommon",    g.get("dpsCommon"));
            m.put("roe",          g.get("ROE"));
            m.put("opm",          g.get("OPM"));
            m.put("debtRatio",    g.get("debtRatio"));
            m.put("curRatio",     g.get("currentRatio"));
            m.put("profitMargin", g.get("profitMargin"));
            m.put("equityRatio",  g.get("equityRatio"));
            m.put("leverage",     g.get("leverage"));
            m.put("roa",          g.get("ROA"));
            m.put("salesGrowth",  g.get("salesGrowth"));
            m.put("netGrowth",    g.get("netProfitGrowth"));
            out.add(m);
        }
        return out;
    }
    
 // ====== ReportServiceImpl 하단(또는 클래스 내 적절한 위치)에 추가 ======
    private static String asStr(Object value) {
        return value == null ? null : String.valueOf(value);
    }


    private static String nzd(String s, String def) { // null → 기본값
        return (s == null || s.isBlank()) ? def : s;
    }

    private static Long toLong(Object value) {
        if (value == null) return null;
        String s = String.valueOf(value).replaceAll("[^0-9\\-]", "");
        if (s.isBlank()) return null;
        return Long.valueOf(s);
    }

    



}
