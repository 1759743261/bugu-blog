package com.bugu.service.impl;

import com.bugu.service.QiniuService;
import com.bugu.common.QiniuCloud;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class QiniuServiceImpl implements QiniuService {

    @Autowired
    private QiniuCloud qiniuCloud;

    @Override
    public String getToken() {
        return qiniuCloud.getToken();
    }

}
