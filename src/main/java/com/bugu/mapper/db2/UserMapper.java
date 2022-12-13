package com.bugu.mapper.db2;

import com.bugu.bean.User;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserMapper {

    // insert、delete、update、query

    void insertOne(User user);

    User queryUserByPhone(String phone);

    User queryUserByQQEmail(String QQEmail);

    User queryUserByPhoneAndPassword(String phone, String password);

}
