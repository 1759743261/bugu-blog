package com.bugu;

import com.bugu.common.QiniuCloud;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class QiniuCloudTest {

    @Autowired
    private QiniuCloud qiniuCloud;

    @Test
    void test1() {
        System.out.println(qiniuCloud);
    }

}
