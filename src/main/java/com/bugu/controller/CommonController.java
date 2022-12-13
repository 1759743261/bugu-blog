package com.bugu.controller;

import com.bugu.service.impl.CommonServiceImpl;
import com.bugu.common.Constant;
import com.bugu.common.R;
import com.bugu.service.impl.QiniuServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;


@Controller
@ResponseBody
@RequestMapping("/common")
public class CommonController {

    @Autowired
    private CommonServiceImpl commonService;

    @Autowired
    private QiniuServiceImpl qiniuService;


    // http://localhost:8080/common/code
    @RequestMapping("/code")
    public String code() {
        HashMap<String, Object> codeImg = commonService.getCodeImg();
        return R.responseJson(Constant.SUCCESS_CODE, "响应成功", codeImg);
    }


    // http://localhost:8080/common/getImageToken
    @CrossOrigin
    @RequestMapping("/getImageToken")
    public String getImageToken() {
        String token = qiniuService.getToken();
        return R.responseJson(Constant.SUCCESS_CODE, "成功获取token", token);
    }


}
