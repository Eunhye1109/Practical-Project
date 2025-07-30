//package com.project.web.jwt;
//
//import io.jsonwebtoken.*;
//import org.springframework.stereotype.Component;
//
//import java.util.Date;
//
//@Component
//public class JwtUtil {
//
//    private final String SECRET_KEY = "mySecretKey"; // ⚠️ 환경변수로 분리 권장
//    private final long EXPIRATION_TIME = 86400000;   // 1일 (24시간)
//
//    // ✅ 1. 토큰 생성
//    public String generateToken(String userId) {
//        return Jwts.builder()
//                .setSubject(userId)
//                .setIssuedAt(new Date())
//                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
//                .signWith(SignatureAlgorithm.HS256, SECRET_KEY)
//                .compact();
//    }
//
//    // ✅ 2. 토큰 유효성 검사 (boolean 리턴)
//    public boolean validateToken(String token) {
//        try {
//            Jwts.parser()
//                    .setSigningKey(SECRET_KEY)
//                    .parseClaimsJws(token);
//            return true;
//        } catch (JwtException | IllegalArgumentException e) {
//            return false;
//        }
//    }
//
//    // ✅ 3. 토큰에서 userId 추출
//    public String getUserIdFromToken(String token) {
//        return Jwts.parser()
//                .setSigningKey(SECRET_KEY)
//                .parseClaimsJws(token)
//                .getBody()
//                .getSubject();
//    }
//}
