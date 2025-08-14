package com.project.web.config;

import java.time.Duration;

import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.web.client.RestTemplate;

@Configuration
public class HttpConfig {

  @Bean("restTemplate")   // 기본 RestTemplate
  @Primary                // 기본 주입 대상(여러 개 있을 때)
  public RestTemplate restTemplate(RestTemplateBuilder builder) {
    return builder
        .setConnectTimeout(Duration.ofSeconds(15))
        .setReadTimeout(Duration.ofSeconds(20))
        .build();
  }
}