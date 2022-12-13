package com.bugu;

import com.bugu.mapper.db1.ArticleMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class ApplicationTest {

    @Autowired
    private ArticleMapper articleMapper;

    @Test
    void contextLoads() {
        articleMapper.queryAll().forEach(System.out::println);
    }

}
