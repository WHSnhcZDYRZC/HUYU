package huyu.user;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication

// 集成当前注册中心
@EnableDiscoveryClient

// 集成 Mybatis-plus， 扫描 Mapper
@MapperScan("com.huyu.user.mapper")
public class PersonalApplication {
    public static void main(String[] args) {
        SpringApplication.run(PersonalApplication.class, args);
    }
}