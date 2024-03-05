package com.huyu.http.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

//解决跨域问题
@Configuration
public class CorsConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // 所有接口
                .allowedOrigins("*") // 支持域
                .allowCredentials(true) // 是否发送 Cookie
                .allowedMethods("GET", "POST", "DELETE", "PUT", "OPTIONS") // 支持方法
                .maxAge(3600);
    }
}