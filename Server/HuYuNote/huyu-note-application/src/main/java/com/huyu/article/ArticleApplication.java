package com.huyu.article;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication(scanBasePackages = {"com.huyu.article", "com.huy.tess4j"})

// 集成当前注册中心
@EnableDiscoveryClient

// 集成 Mybatis-plus， 扫描 Mapper
@MapperScan(value = {"com.huyu.article.mapper"})

// 开启异步调用
@EnableAsync
public class ArticleApplication {
    public static void main(String[] args) {
        SpringApplication.run(ArticleApplication.class, args);
    }
}
