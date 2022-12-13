package com.bugu;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.ServletComponentScan;

// http://localhost:8080/Blog/page/front/index.html
// http://127.0.0.1:8080/Blog/page/front/index.html
// http://120.24.72.223:8080/Blog/page/front/index.html
@SpringBootApplication
@ServletComponentScan
public class Application {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

}


