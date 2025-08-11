package com.project.web.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.web.client.RestTemplate;

@Configuration
public class HttpConfig {
  @Bean
  public RestTemplate restTemplate() {
    var factory = new HttpComponentsClientHttpRequestFactory();
    factory.setConnectTimeout(3000);
    factory.setReadTimeout(4000);
    return new RestTemplate(factory);
  }
}
