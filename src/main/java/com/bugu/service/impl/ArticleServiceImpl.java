package com.bugu.service.impl;

import com.bugu.bean.Article;
import com.bugu.bean.Category;
import com.bugu.mapper.db1.ArticleMapper;
import com.bugu.mapper.db2.CategoryMapper;
import com.bugu.service.ArticleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@Service
public class ArticleServiceImpl implements ArticleService {

    @Autowired
    private ArticleMapper articleMapper;

    @Autowired
    private CategoryMapper categoryMapper;


    @Override
    public void addOne(Article article) {
        article.setCreateTime(LocalDateTime.now());
        article.setUpdateTime(LocalDateTime.now());
        articleMapper.insertOne(article);
    }


    @Override
    public void removeOneById(Integer id) {
        articleMapper.deleteOneById(id);
    }

    @Override
    public HashMap<String, Object> getTop3ByDate() {
        List<Article> infoList = articleMapper.queryTop3ByDate();
        ArrayList<String> imageList = new ArrayList();
        imageList.add("http://rmi7wxav0.hn-bkt.clouddn.com/FjHZnla41a-n6LKmz3HTCkqjI89T");
        imageList.add("http://rmi7wxav0.hn-bkt.clouddn.com/Fgg8YyVuWkJk-4u-koIfqd-oQZVx");
        imageList.add("http://rmi7wxav0.hn-bkt.clouddn.com/Fuj0W-6ZOaHH4KZG2yy2440K1r4B");
        HashMap<String, Object> hashMap = new HashMap();
        hashMap.put("infoList", infoList);
        hashMap.put("imageList", imageList);
        return hashMap;
    }

    @Override
    public List<Article> getAll() {
        List<Article> articleList = articleMapper.queryAll();
        // 处理分类不存在的情况
        articleList.forEach(article -> {
            if (article.getCategory() == null) {
                Category category = new Category();
                category.setName("暂无分类");
                article.setCategory(category);
            }
        });
        return articleList;
    }


    @Override
    public Article getOneById(Integer id) {
        return articleMapper.queryOneById(id);
    }


    @Override
    public List<Article> getListByCondition(String condition) {
        // 1. 查询相关分类的 id
        List<Category> categoryListByName = categoryMapper.queryListByLikeCategoryName(condition);
        ArrayList<Integer> categoryIdList = new ArrayList<>();
        categoryListByName.forEach((category) -> categoryIdList.add(category.getId()));
        // 2. 查询文章
        List<Article> articleList = articleMapper.queryListByLikeTitleAndInCategoryId(condition, categoryIdList);
        // 3. 处理分类不存在的情况
        articleList.forEach(article -> {
            if (article.getCategory() == null) {
                Category category = new Category();
                category.setName("暂无分类");
                article.setCategory(category);
            }
        });
        return articleList;
    }


    @Override
    public void updateOneById(Article article) {
        article.setUpdateTime(LocalDateTime.now());
        articleMapper.updateOneById(article);
    }

    @Override
    public List<Article> getNotice() {
        return articleMapper.queryNoticeByDateTop3();
    }

    @Override
    public Long getCount() {
        return articleMapper.queryCount();
    }

    @Override
    public List<Article> getPage(int nowPage, int pageSize) {
        return articleMapper.queryPage((nowPage - 1) * pageSize, pageSize);
    }

    @Override
    public void setArticleReadCount(Integer id) {
        articleMapper.setArticleReadCount(id);
    }

    @Override
    public void setArticleLikeCount(Integer id) {
        articleMapper.setArticleLikeCount(id);
    }

//    @Override
//    public Article getOneByCategoryId(Integer id) {
//        return articleMapper.queryOneByCategoryId(id);
//    }

}
