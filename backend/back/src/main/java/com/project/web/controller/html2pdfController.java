//package com.project.web.controller;
//
//import org.springframework.http.ResponseEntity;
//import org.springframework.http.MediaType; // ✅ 스프링의 MediaType
//import org.springframework.web.bind.annotation.*;
//import lombok.RequiredArgsConstructor;
//import com.project.web.service.html2pdfService;
//
//import io.swagger.v3.oas.annotations.Operation;
//import io.swagger.v3.oas.annotations.media.Content;
//import io.swagger.v3.oas.annotations.media.Schema;
//import io.swagger.v3.oas.annotations.responses.ApiResponse;
//
//@RestController
//@RequiredArgsConstructor
//@RequestMapping("/api/v1")
//public class html2pdfController {
//
//    private final html2pdfService html2pdfService;
//
//    @Operation(
//        summary = "레포트 PDF 출력",
//        responses = {
//            @ApiResponse(
//                responseCode = "200",
//                description = "성공",
//                content = @Content(
//                    mediaType = "application/pdf",
//                    schema = @Schema(type = "string", format = "binary")
//                )
//            )
//        }
//    )
//    @GetMapping(value = "/html2pdf/report", produces = MediaType.APPLICATION_PDF_VALUE)
//    public ResponseEntity<byte[]> report(
//            @RequestParam String corpCode,
//            @RequestParam(defaultValue = "false") boolean deep,
//            @RequestHeader(name = "X-Auth-Token", required = false) String token
//    ) {
//        return html2pdfService.fetchReportPdf(corpCode, deep, token);
//    }
//}
