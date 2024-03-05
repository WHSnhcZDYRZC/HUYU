package com.huyu.http2;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = {"com.huyu.http2", "com.huyu.http"})
//@SpringBootApplication
public class Http2Application {
    public static void main(String[] args) {
        SpringApplication.run(Http2Application.class, args);
    }
}
