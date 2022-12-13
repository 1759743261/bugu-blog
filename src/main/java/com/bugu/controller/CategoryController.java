package com.bugu.controller;

import com.bugu.bean.Category;
import com.bugu.service.impl.CategoryServiceImpl;
import com.bugu.common.Constant;
import com.bugu.common.R;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
@ResponseBody
@RequestMapping("/category")
public class CategoryController {

    @Autowired
    private CategoryServiceImpl categoryService;


    // http://localhost:8080/category/add
    @RequestMapping("/add")
    public String add(Category category) {
        if (category != null) {
            // 1. 验证分类是否已经存在
            if (categoryService.getOneByName(category.getName()) != null) {
                return R.responseJson(Constant.FAIL_CODE, "增加分类失败【分类已存在】", null);
            }
            // 2. 分类不存在，新增分类
            categoryService.addOne(category);
            return R.responseJson(Constant.SUCCESS_CODE, "增加分类成功", null);
        }
        return R.responseJson(Constant.FAIL_CODE, "增加分类失败【数据异常】", null);
    }


    // http://localhost:8080/category/delete
    @RequestMapping("/delete")
    public String delete(Integer id) {
        if (id == null) {
            return R.responseJson(Constant.FAIL_CODE, "删除分类失败【数据异常】", null);
        }
        if (categoryService.removeOneById(id) <= 0) {
            return R.responseJson(Constant.FAIL_CODE, "删除分类失败【删除数据库的数据失败】", null);
        }
        return R.responseJson(Constant.SUCCESS_CODE, "删除成功", null);
    }


    // http://localhost:8080/category/update
    @RequestMapping("/update")
    public String update(Category category) {
        if (category == null) {
            return R.responseJson(Constant.FAIL_CODE, "修改分类失败", null);
        }
        if (categoryService.updateOneById(category) <= 0) {
            return R.responseJson(Constant.FAIL_CODE, "修改分类失败", null);
        }
        return R.responseJson(Constant.SUCCESS_CODE, "修改分类成功", null);
    }


    // http://localhost:8080/category/getAll
    @RequestMapping("/getAll")
    public String getAll() {
        List<Category> all = categoryService.getAll();
        return R.responseJson(Constant.SUCCESS_CODE, "查询全部分类成功", all);
    }


    // http://localhost:8080/category/getListByCondition
    @RequestMapping("/getListByCondition")
    public String getListByCondition(String condition) {
        // 1. 条件为空，查询全部数据
        if (condition == null || "".equals(condition)) {
            List<Category> all = categoryService.getAll();
            if (all.size() == 0) {
                return R.responseJson(Constant.FAIL_CODE, "条件为空，查询全部数据，查询结果为空", all);
            }
            return R.responseJson(Constant.SUCCESS_CODE, "条件为空，查询全部数据", all);
        }
        // 2. 根据条件进行查询数据
        List<Category> listByCondition = categoryService.getListByCondition(condition);
        if (listByCondition.size() == 0) {
            return R.responseJson(Constant.FAIL_CODE, "查询结果为空", listByCondition);
        }
        return R.responseJson(Constant.SUCCESS_CODE, "查询分类成功", listByCondition);
    }


}
