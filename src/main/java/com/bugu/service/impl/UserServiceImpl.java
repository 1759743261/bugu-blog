package com.bugu.service.impl;

import com.bugu.bean.User;
import com.bugu.mapper.db2.UserMapper;
import com.bugu.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserMapper userMapper;

    @Override
    public void addOne(User user) {
        userMapper.insertOne(user);
    }

    @Override
    public User getUserByPhone(String phone) {
        return userMapper.queryUserByPhone(phone);
    }

    @Override
    public User getUserByQQEmail(String QQEmail) {
        return userMapper.queryUserByQQEmail(QQEmail);
    }

    @Override
    public User getUserByPhoneAndPassword(String phone, String password) {
        return userMapper.queryUserByPhoneAndPassword(phone, password);
    }
}
