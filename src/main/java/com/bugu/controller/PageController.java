package com.bugu.controller;

import com.bugu.bean.vo.IndexVO;
import com.bugu.service.impl.PageServiceImpl;
import com.bugu.common.Constant;
import com.bugu.common.R;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;

@Slf4j
@Controller
@ResponseBody
@RequestMapping("/page")
public class PageController {


    @Autowired
    private PageServiceImpl pageService;

    @RequestMapping({"/getLunbotu"})
    public String getLunbotu(HttpServletRequest req) {
        HashMap<String, Object> lunbotu = this.pageService.getLunbotuData();
        return R.responseJson(Constant.SUCCESS_CODE, "响应成功", lunbotu);
    }

    // http://localhost:8080/page/getColor
    @RequestMapping("/getColor")
    public String getColor() {
        String color = pageService.getColor();
        return R.responseJson(Constant.SUCCESS_CODE, "响应成功", color);
    }


    // http://localhost:8080/page/getBlogLogo
    @RequestMapping("/getBlogLogo")
    public String getBlogLogo() {
        HashMap<String, Object> blogLogo = pageService.getBlogLogo();
        return R.responseJson(Constant.SUCCESS_CODE, "响应成功", blogLogo);
    }


    // http://localhost:8080/page/getIndexVO
    @RequestMapping("/getIndexVO")
    public String getIndexVO() {
        IndexVO indexVO = pageService.getIndexVO();
        return R.responseJson(Constant.SUCCESS_CODE, "响应成功", indexVO);
    }


    // http://localhost:8080/page/blogID
    @RequestMapping("/blogID")
    public String blogId() {
        HashMap<String, String> blogId = pageService.getBlogId();
        return R.responseJson(Constant.SUCCESS_CODE, "响应成功", blogId);
    }

    // http://localhost:8080/page/getOnline
    @RequestMapping("/getOnline")
    public String getOnline(HttpServletRequest req) {
        Object online = req.getSession().getServletContext().getAttribute("online");
        if (online == null) {
            online = 0;
        }
        log.info("在线人数为：" + online);
        req.getSession().setMaxInactiveInterval(60 * 30); // 单位s
        return R.responseJson(Constant.SUCCESS_CODE, "响应成功", online);
    }


}
