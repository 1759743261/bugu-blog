package com.bugu.service;


import com.bugu.bean.Category;

import java.util.List;

public interface CategoryService {

    // add、remove、update、get

    // 用法1：增加文章
    void addOne(Category category);

    // 用法1：删除文章
    int removeOneById(Integer id);

    // 用法1：编辑文章
    int updateOneById(Category category);

    // 用法1：
    List<Category> getAll();

    // 用法1：
    Category getOneByName(String name);

    // 用法1：
    List<Category> getListByCondition(String condition);

}
