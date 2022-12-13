package com.bugu.service;

import com.bugu.bean.User;

public interface UserService {

    // add、remove、update、get

    // 用法1：注册用户
    void addOne(User user);

    // 用法1：注册用户时，验证手机号码是否被占有
    User getUserByPhone(String phone);

    // 用法1：注册用户时，验证QQ邮箱是否被占有
    User getUserByQQEmail(String QQEmail);

    // 用法1：登录的时候进行验证
    User getUserByPhoneAndPassword(String phone, String password);

}
