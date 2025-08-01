package com.project.web.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.*;

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

	@Override
	public void addCorsMappings(CorsRegistry registry) {
		registry.addMapping("/**")
				.allowedOrigins("http://localhost:3000","http://localhost:8087") // React 개발용, swagger
				.allowedMethods("GET", "POST", "PUT", "PATCH", "DELETE","OPTIONS")
				.allowedHeaders("*")
				.allowCredentials(true);
	}
}
