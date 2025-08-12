package com.project.web.service;

import com.project.web.dto.*;
import com.project.web.mapper.ReportPersistMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReportServiceImpl implements ReportService {

    private final ReportPersistMapper mapper;

    // ========== 1) 존재 여부 (3개월 룰) ==========
    @Override
    public boolean existsValidReportDeep(String corpCode) {
        Integer ok = mapper.existsValidReportDeep(corpCode);
        return ok != null && ok == 1;
    }

    // ========== 2) 저장 ==========
    @Transactional
    @Override
    public void persistReport(SearchResultDTO dto) {

        final String corpCode = dto.getCorpCode();

        // 2-1) RAW JSON(원본 백업)
        Map<String, Object> raw = new HashMap<>();
        raw.put("corpCode", corpCode);
        raw.put("rawJson", dto); // 필요하면 ObjectMapper로 문자열화
        mapper.mergeRawJson(raw);

        // 2-2) HEADER
        HeaderDTO h = dto.getHeader();
        Map<String, Object> header = Map.of(
                "corpCode", corpCode,
                "corpName", nvl(h.getCorpName(), "정보없음"),
                "logoUrl", nvl(h.getLogoUrl(), ""),
                "major",   nvl(h.getMajor(), "정보없음"),
                "keywordsJson", (h.getKeyword() == null ? "[]" : String.join(",", h.getKeyword()))
        );
        mapper.mergeHeader(header);

        // 2-3) INFOBOX
        InfoBoxDTO ib = dto.getInfoBox();
        List<String> info = ib.getInfoData() == null ? List.of() : ib.getInfoData();
        Map<String, Object> infoBox = new HashMap<>();
        infoBox.put("corpCode", corpCode);
        infoBox.put("corpSummary", nvl(ib.getCorpSummary(), "정보없음"));
        infoBox.put("ceoName",  info.size() > 0 ? nvl(info.get(0), "정보없음") : "정보없음");
        infoBox.put("stockType",info.size() > 1 ? nvl(info.get(1), "정보없음") : "정보없음");
        infoBox.put("latestRevenue", info.size() > 2 ? toLong(info.get(2)) : null);
        infoBox.put("empCount", info.size() > 3 ? toLong(info.get(3)) : null);
        infoBox.put("establishDate", info.size() > 4 ? nvl(info.get(4), "정보없음") : "정보없음");
        mapper.mergeInfoBox(infoBox);

        // 2-4) RADAR
        List<Map<String,Object>> rList = (dto.getRader()==null? List.of() :
                dto.getRader().stream().map(r -> Map.of(
                        "corpCode", corpCode,
                        "subject",  r.getSubject(),
                        "aVal",     r.getA(),
                        "bVal",     r.getB(),
                        "fullMark", r.getFullMark()
                )).collect(Collectors.toList()));
        if (!rList.isEmpty()) mapper.upsertRadarBatch(Map.of("corpCode", corpCode, "list", rList));

        // 2-5) GRAPH  ← **여기가 안 들어가던 부분**
        List<Map<String,Object>> gList = normalizeGraph(dto.getGraphData());
        if (!gList.isEmpty()) mapper.upsertGraphBatch(Map.of("corpCode", corpCode, "list", gList));

        // 2-6) NEWS
        List<Map<String,Object>> nList = (dto.getNewsData()==null? List.of() :
                dto.getNewsData().stream().map(n -> Map.of(
                        "corpCode", corpCode,
                        "date",    nvl(n.getDate(), ""),
                        "title",   nvl(n.getTitle(), ""),
                        "body",    nvl(n.getBody(), ""),
                        "link",    nvl(n.getLink(), "")
                )).collect(Collectors.toList()));
        if (!nList.isEmpty()) mapper.mergeNewsBatch(Map.of("corpCode", corpCode, "list", nList));

        // 2-7) SIGNAL
        SearchResultDTO.SignalDTO sig = dto.getSignalData();
        if (sig != null) {
            mapper.mergeSignal(Map.of(
                    "corpCode", corpCode,
                    "corpName", nvl(sig.getCorpName(), dto.getCorpName()),
                    "signalScore", nvl(sig.getSignalScore(), "0")
            ));
        }
    }

    // ========== 3) 조회(3개월 이내면 DB→DTO 재구성) ==========
    @Override
    public SearchResultDTO getReport(String corpCode) {

        Map<String,Object> h = mapper.selectHeader(corpCode);     // 단건
        Map<String,Object> i = mapper.selectInfoBox(corpCode);    // 단건
        List<Map<String,Object>> rlist = mapper.selectRadar(corpCode);
        List<Map<String,Object>> glist = mapper.selectGraph(corpCode);
        List<Map<String,Object>> nlist = mapper.selectNews(corpCode);
        Map<String,Object> s = mapper.selectSignal(corpCode);

        // --- header ---
        HeaderDTO header = HeaderDTO.builder()
                .corpName(nvl(str(h.get("CORP_NAME")), "정보없음"))
                .logoUrl(nvl(str(h.get("LOGO_URL")), ""))
                .major(nvl(str(h.get("MAJOR")), "정보없음"))
                .keyword(parseKeywords(str(h.get("KEYWORDS_JSON"))))
                .build();

        // --- infoBox ---
        List<String> infoData = new ArrayList<>();
        infoData.add(nvl(str(i.get("CEO_NAME")), "정보없음"));
        infoData.add(nvl(str(i.get("STOCK_TYPE")), "정보없음"));
        infoData.add(fmtNum(i.get("LATEST_REVENUE")));
        infoData.add(fmtNum(i.get("EMP_COUNT")));
        infoData.add(nvl(str(i.get("ESTABLISH_DATE")), "정보없음"));

        InfoBoxDTO infoBox = InfoBoxDTO.builder()
                .corpSummary(nvl(str(i.get("CORP_SUMMARY")), "정보없음"))
                .infoData(infoData)
                .build();

        // --- radar ---
        List<RadarDTO> radar = rlist.stream().map(m ->
                RadarDTO.builder()
                        .subject(nvl(str(m.get("SUBJECT")), ""))
                        .A(nvlInt(m.get("A_VALUE")))
                        .B(nvlInt(m.get("B_VALUE")))
                        .fullMark(nvlInt(m.get("FULL_MARK")))
                        .build()
        ).collect(Collectors.toList());

        // --- ai (있으면) ---
        // 필요 시 mapper.selectAiSummary(corpCode) 만들어서 매핑, 지금은 빈 리스트로.
        List<AiSummaryDTO> aiList = new ArrayList<>();

        // --- news ---
        List<NewsDataDTO> news = nlist.stream().map(m ->
                NewsDataDTO.builder()
                        .date(nvl(str(m.get("NEWS_DATE")), ""))
                        .title(nvl(str(m.get("TITLE")), ""))
                        .body(nvl(str(m.get("BODY")), ""))
                        .link(nvl(str(m.get("LINK")), ""))
                        .build()
        ).collect(Collectors.toList());

        // --- graph (DB → 프론트 포맷) ---
        List<Map<String,Object>> graph = glist.stream().map(m -> {
            Map<String,Object> g = new LinkedHashMap<>();
            g.put("year", str(m.get("YEAR")));
            g.put("순이익",         m.get("NET_PROFIT"));
            g.put("영업이익",       m.get("OP_PROFIT"));
            g.put("부채총계",       m.get("TOTAL_DEBT"));
            g.put("자본총계",       m.get("TOTAL_EQUITY"));
            g.put("매출액",         m.get("REVENUE"));
            g.put("유동자산",       m.get("CUR_ASSETS"));
            g.put("유동부채",       m.get("CUR_DEBTS"));
            g.put("jan_salary_am", m.get("AVG_SALARY"));
            g.put("sm",            m.get("EMP_CNT"));
            g.put("주당 현금배당금(원)", m.get("DPS_COMMON"));
            g.put("ROE",           m.get("ROE"));
            g.put("영업이익률",     m.get("OPM"));
            g.put("부채비율",       m.get("DEBT_RATIO"));
            g.put("유동비율",       m.get("CUR_RATIO"));
            g.put("매출액순이익률", m.get("PROFIT_MARGIN"));
            g.put("자기자본비율",   m.get("EQUITY_RATIO"));
            g.put("레버리지비율",   m.get("LEVERAGE"));
            g.put("ROA",           m.get("ROA"));
            g.put("매출액성장률",   m.get("SALES_GROWTH"));
            g.put("순이익성장률",   m.get("NET_GROWTH"));
            return g;
        }).collect(Collectors.toList());

        // --- signal ---
        SearchResultDTO.SignalDTO signal = SearchResultDTO.SignalDTO.builder()
                .corpName(nvl(str(s.get("CORP_NAME")), ""))
                .signalScore(nvl(str(s.get("SIGNAL_SCORE")), "0"))
                .build();

        return SearchResultDTO.builder()
                .corpName(header.getCorpName())
                .corpCode(corpCode)
                .header(header)
                .infoBox(infoBox)
                .rader(radar)               // ★ 필드명이 rader(오타) 맞음
                .aiSumary(aiList)           // ★ 필드명이 aiSumary(오타) 맞음
                .graphData(graph)
                .newsData(news)
                .signalData(signal)
                .build();
    }

    // ===== 유틸 =====
    private static String nvl(String s, String def) { return (s==null || s.isEmpty()) ? def : s; }
    private static String str(Object o){ return o==null ? null : String.valueOf(o); }
    private static int nvlInt(Object o){
        if (o==null) return 0;
        if (o instanceof Number) return ((Number)o).intValue();
        String s = str(o).replace(",","");
        return s.isEmpty()?0: new BigDecimal(s).intValue();
    }
    private static String fmtNum(Object o){
        if (o==null) return "정보없음";
        try { return String.format("%,d", new BigDecimal(str(o).replace(",","")).longValue()); }
        catch (Exception e){ return str(o); }
    }
    private static Long toLong(String s){
        try { return new BigDecimal(s.replace(",","")).longValue(); } catch (Exception e){ return null; }
    }
    private static List<String> parseKeywords(String raw){
        if (raw==null || raw.isBlank()) return List.of();
        // DB에 ,로 저장했으면 분리, JSON이면 파서로 바꿔도 됨
        return Arrays.stream(raw.split(",")).map(String::trim).filter(v->!v.isEmpty()).collect(Collectors.toList());
    }

    /** 프론트 → DB 포맷으로 변환(키 영문화) */
    private static List<Map<String,Object>> normalizeGraph(List<Map<String,Object>> raw) {
        if (raw==null) return List.of();
        List<Map<String,Object>> out = new ArrayList<>();
        for (Map<String,Object> g : raw) {
            Map<String,Object> m = new LinkedHashMap<>();
            m.put("year",           g.get("year"));
            m.put("netProfit",      g.get("순이익"));
            m.put("opProfit",       g.get("영업이익"));
            m.put("totalDebt",      g.get("부채총계"));
            m.put("totalEquity",    g.get("자본총계"));
            m.put("revenue",        g.get("매출액"));
            m.put("curAssets",      g.get("유동자산"));
            m.put("curDebts",       g.get("유동부채"));
            m.put("avgSalary",      g.get("jan_salary_am"));
            m.put("empCnt",         g.get("sm"));
            m.put("dpsCommon",      g.get("주당 현금배당금(원)"));
            m.put("roe",            g.get("ROE"));
            m.put("opm",            g.get("영업이익률"));
            m.put("debtRatio",      g.get("부채비율"));
            m.put("curRatio",       g.get("유동비율"));
            m.put("profitMargin",   g.get("매출액순이익률"));
            m.put("equityRatio",    g.get("자기자본비율"));
            m.put("leverage",       g.get("레버리지비율"));
            m.put("roa",            g.get("ROA"));
            m.put("salesGrowth",    g.get("매출액성장률"));
            m.put("netGrowth",      g.get("순이익성장률"));
            out.add(m);
        }
        return out;
    }
}
