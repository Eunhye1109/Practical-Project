package com.project.web.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.*;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

	@Override
	public void addCorsMappings(CorsRegistry registry) {
		registry.addMapping("/**")
				.allowedOrigins("http://localhost:3000","http://localhost:8087") // React 개발용, swagger
<<<<<<< HEAD
				.allowedMethods("GET", "POST", "PUT", "PATCH", "DELETE","OPTIONS")
=======
				.allowedMethods("GET", "POST", "PUT", "DELETE")
>>>>>>> ff40fe6 (feat: search FASTAPI 연동중)
				.allowedHeaders("*")
				.allowCredentials(true);
	}
}
