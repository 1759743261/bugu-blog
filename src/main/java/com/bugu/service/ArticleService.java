package com.bugu.service;

import com.bugu.bean.Article;

import java.util.HashMap;
import java.util.List;

public interface ArticleService {

    // add、remove、update、get

    void addOne(Article article);

    void removeOneById(Integer id);

    // 用法1：后台管理文章的时候，查看文章列表
    // 用法2：时间轴
    List<Article> getAll();
    Article getOneById(Integer id);
    List<Article> getListByCondition(String condition);

    void updateOneById(Article article);

    List<Article> getNotice();

    HashMap<String, Object> getTop3ByDate();

    Long getCount();

    List<Article> getPage(int nowPage, int pageSize);

    void setArticleReadCount(Integer id);

    void setArticleLikeCount(Integer id);
}
