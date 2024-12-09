package com.ApplicationBackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.boot.autoconfigure.domain.EntityScan;

@SpringBootApplication
@EnableJpaRepositories(basePackages = "com.ApplicationBackend.repository")
@EntityScan(basePackages = "com.ApplicationBackend.model")
@ComponentScan(basePackages = "com.ApplicationBackend")
public class ApplicationBackend {
    public static void main(String[] args) {
        SpringApplication.run(ApplicationBackend.class, args);
    }
}
