# Practical-Project
(비)상장사 투자를 위한 핵심 정보를 편리하고 쉽게 파악할 수 있는 자동화 금융 리포트 WBS


# 📦 Backend 설정 가이드 (Spring Boot + MyBatis + Oracle)

## ✅ 공통 설정
- `application.properties` → Git 커밋 O
- Swagger, DB Driver, 로그 설정 포함

## 🔐 개인 설정
- `application-dev.properties` 직접 생성
```properties
server.port=8087
spring.datasource.url=jdbc:oracle:thin:@localhost:1523:xe
spring.datasource.username=kim
spring.datasource.password=smhrd1
