package com.bugu.service.impl;

import com.bugu.bean.Category;
import com.bugu.mapper.db2.CategoryMapper;
import com.bugu.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryMapper categoryMapper;


    @Override
    public void addOne(Category category) {
        category.setCreateTime(LocalDateTime.now());
        category.setUpdateTime(LocalDateTime.now());
        categoryMapper.insertOne(category);
    }


    @Override
    public int removeOneById(Integer id) {
        return categoryMapper.deleteOneById(id);
    }


    @Override
    public int updateOneById(Category category) {
        category.setUpdateTime(LocalDateTime.now());
        return categoryMapper.updateOneById(category);
    }


    @Override
    public List<Category> getAll() {
        return categoryMapper.queryAll();
    }


    @Override
    public Category getOneByName(String name) {
        return categoryMapper.queryOneByName(name);
    }


    @Override
    public List<Category> getListByCondition(String condition) {
        return categoryMapper.queryListByLikeCategoryName(condition);
    }

}
