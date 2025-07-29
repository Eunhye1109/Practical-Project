package com.project.web.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.*;
<<<<<<< HEAD
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
=======
>>>>>>> d29a4fc (공통 설정 파일 및 CORS, Swagger 설정 통합 적용)

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

	@Override
	public void addCorsMappings(CorsRegistry registry) {
		registry.addMapping("/**")
<<<<<<< HEAD
				.allowedOrigins("http://localhost:3000","http://localhost:8087") // React 개발용, swagger
				.allowedMethods("GET", "POST", "PUT", "PATCH", "DELETE","OPTIONS")
=======
				.allowedOrigins("http://localhost:3000") // React 개발용
				.allowedMethods("GET", "POST", "PUT", "DELETE")
>>>>>>> d29a4fc (공통 설정 파일 및 CORS, Swagger 설정 통합 적용)
				.allowedHeaders("*")
				.allowCredentials(true);
	}
}
