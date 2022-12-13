package com.bugu.mapper.db2;

import com.bugu.bean.Category;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface CategoryMapper {

    // insert、delete、update、query

    void insertOne(Category category);

    int deleteOneById(Integer id);

    int updateOneById(Category category);

    List<Category> queryAll();

    // 用法1：查询文章数据时，分步查询的第二步
    Category queryOneById(Integer id);

    Category queryOneByName(String name);
    List<Category> queryListByLikeCategoryName(String categoryName);

}
