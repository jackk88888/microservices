package com.gunes;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.hystrix.dashboard.EnableHystrixDashboard;
import org.springframework.cloud.netflix.turbine.EnableTurbine;
import org.springframework.web.bind.annotation.RequestMapping;

@SpringBootApplication
@EnableHystrixDashboard
@EnableTurbine
public class HystrixDashboardServerApplication {

    public static void main(String[] args) {
        SpringApplication.run(HystrixDashboardServerApplication.class, args);
    }

    @RequestMapping("/")
    public String home() {
        return "forward:/hystrix";
    }
}