package com.huyu.http;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = {"com.huyu.system", "com.huyu.http"})
@MapperScan(value = {"com.huyu.http.mapper"})

//@SpringBootApplication
public class HttpApplication {
    public static void main(String[] args) {
        SpringApplication.run(HttpApplication.class, args);
    }
}
