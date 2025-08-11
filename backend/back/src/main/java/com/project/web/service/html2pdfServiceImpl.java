//package com.project.web.service;
//
//import org.springframework.http.*;
//import org.springframework.stereotype.Service;
//import org.springframework.web.client.RestTemplate;
//import lombok.RequiredArgsConstructor;
//
//@Service
//@RequiredArgsConstructor
//public class html2pdfServiceImpl implements html2pdfService {
//
//    // 프로젝트에서 RestTemplate을 이미 사용 중이니 동일하게 맞춤
//    private final RestTemplate restTemplate = new RestTemplate();
//
//    // FastAPI PDF 엔드포인트 호출
//    @Override
//    public ResponseEntity<byte[]> fetchReportPdf(String corpCode, boolean deep, String token) {
//        String url = "http://localhost:8000/pdf/report?corp_code=" + corpCode + "&deep=" + deep;
//
//        HttpHeaders headers = new HttpHeaders();
//        if (token != null && !token.isBlank()) {
//            headers.set("Authorization", "Bearer " + token);
//        }
//        HttpEntity<Void> entity = new HttpEntity<>(headers);
//
//        ResponseEntity<byte[]> resp = restTemplate.exchange(url, HttpMethod.GET, entity, byte[].class);
//
//        HttpHeaders out = new HttpHeaders();
//        out.setContentType(MediaType.APPLICATION_PDF);
//        // FastAPI에서 내려준 파일명 헤더가 있으면 그대로 사용
//        String cd = resp.getHeaders().getFirst(HttpHeaders.CONTENT_DISPOSITION);
//        if (cd != null) out.set(HttpHeaders.CONTENT_DISPOSITION, cd);
//
//        return new ResponseEntity<>(resp.getBody(), out, resp.getStatusCode());
//    }
//}
