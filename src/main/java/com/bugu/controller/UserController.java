package com.bugu.controller;

import com.bugu.bean.User;
import com.bugu.service.impl.UserServiceImpl;
import com.bugu.common.Constant;
import com.bugu.common.R;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;

@Controller
@ResponseBody
@RequestMapping("/user")
public class UserController {


    @Autowired
    private UserServiceImpl userService;


    // http://localhost:8080/user/login
    @RequestMapping("/login")
    public String login(User user, HttpServletRequest req) {
        if (user != null) {
            if (userService.getUserByPhoneAndPassword(user.getPhone(), user.getPassword()) != null) {
                req.getSession().setAttribute("user", user);
                return R.responseJson(Constant.SUCCESS_CODE, "登录成功", null);
            } else {
                return R.responseJson(Constant.FAIL_CODE, "登录失败，用户名或者密码错误", null);
            }
        } else {
            return R.responseJson(Constant.FAIL_CODE, "登录失败，数据异常", null);
        }
    }


    // http://localhost:8080/user/logout
    @RequestMapping("/logout")
    public String logout(HttpServletRequest req) {
        req.getSession().removeAttribute("user");
        return R.responseJson(Constant.SUCCESS_CODE, "退出登录成功", null);
    }


    // http://localhost:8080/user/register
    @RequestMapping("/register")
    public String register(User user) {
        boolean f = true;
        if (!f) {
            if (user != null) {
                if (userService.getUserByPhone(user.getPhone()) != null) {
                    return R.responseJson(Constant.FAIL_CODE, "注册失败【手机号已经被注册】", null);
                }
                if (userService.getUserByQQEmail(user.getQQEmail()) != null) {
                    return R.responseJson(Constant.FAIL_CODE, "注册失败【邮箱已经被注册】", null);
                }
                userService.addOne(user);
                return R.responseJson(Constant.SUCCESS_CODE, "注册成功", null);
            }
            return R.responseJson(Constant.FAIL_CODE, "注册失败【数据异常】", null);
        } else {
            return R.responseJson(Constant.SUCCESS_CODE, "注册功能暂不开放", null);
        }
    }


}
