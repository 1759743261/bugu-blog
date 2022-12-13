package com.bugu.controller;

import com.bugu.bean.Article;
import com.bugu.bean.Category;
import com.bugu.service.impl.ArticleServiceImpl;
import com.bugu.common.Constant;
import com.bugu.utils.MarkdownToHTMLUtil;
import com.bugu.common.R;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.List;

@Controller
@ResponseBody
@RequestMapping("/article")
@Slf4j
public class ArticleController {


    @Autowired
    private ArticleServiceImpl articleService;


    // http://localhost:8080/article/add
    @RequestMapping("/add")
    public String add(Article article, Integer categoryId) {
        article.setCategory(new Category(categoryId, null, null, null));
        articleService.addOne(article);
        return R.responseJson(Constant.SUCCESS_CODE, "保存成功", null);
    }


    // http://localhost:8080/article/delete
    @RequestMapping("/delete")
    public String delete(Integer id) {
        articleService.removeOneById(id);
        return R.responseJson(Constant.SUCCESS_CODE, "删除成功", null);
    }


    // http://localhost:8080/article/update
    @RequestMapping("/update")
    public String update(Article article, Integer categoryId) {
        article.setCategory(new Category(categoryId, null, null, null));
        articleService.updateOneById(article);
        return R.responseJson(Constant.SUCCESS_CODE, "保存成功", null);
    }


    // http://localhost:8080/article/getAll
    @RequestMapping("/getAll")
    public String getAll() {
        log.debug("============================================");
        log.debug("============================================");
        log.debug("============================================");
        List<Article> articleList = articleService.getAll();
        return R.responseJson(Constant.SUCCESS_CODE, "获取全部的文章成功", articleList);
    }


    // http://localhost:8080/article/getPage
    @RequestMapping("/getPage")
    public String getPage(int nowPage) {
        List<Article> articleList = articleService.getPage(nowPage, Constant.PAGE_SIZE);
        Long count = articleService.getCount();
        HashMap<String, Object> hashMap = new HashMap<>();
        hashMap.put("articleList", articleList);
        hashMap.put("count", count);
        hashMap.put("prePage", nowPage - 1);
        hashMap.put("nowPage", nowPage);
        hashMap.put("nextPage", nowPage + 1);
        hashMap.put("pageSize", Constant.PAGE_SIZE);
        hashMap.put("isPrePage", (nowPage - 1) > 0);
        hashMap.put("isNextPage", nowPage * 5L < count ? 1 : 0);
        return R.responseJson(Constant.SUCCESS_CODE, "获取全部的文章成功", hashMap);
    }


    // http://localhost:8080/article/getListByCondition
    @RequestMapping("/getListByCondition")
    public String getListByCondition(String condition) {
        // 1. 条件为空，查询全部数据
        if (condition == null || "".equals(condition)) {
            List<Article> articleList = articleService.getAll();
            if (articleList.size() == 0) {
                return R.responseJson(Constant.FAIL_CODE, "条件为空，查询全部数据，查询结果为空", articleList);
            }
            return R.responseJson(Constant.SUCCESS_CODE, "条件为空，查询全部数据", articleList);
        }
        // 2. 根据条件进行查询文章
        List<Article> articleListByCondition = articleService.getListByCondition(condition);
        if (articleListByCondition.size() == 0) {
            return R.responseJson(Constant.FAIL_CODE, "查询结果为空", articleListByCondition);
        }
        return R.responseJson(Constant.SUCCESS_CODE, "查询文章成功", articleListByCondition);
    }


    // http://localhost:8080/article/getById
    @RequestMapping("/getById")
    public String getById(Integer id, Integer isToHtml) {
        // 1. 条件为空，查询全部数据
        if (id == null) {
            return R.responseJson(Constant.SUCCESS_CODE, "参数错误", null);
        }
        // 2. 根据条件进行查询数据
        Article article = articleService.getOneById(id);
        if (isToHtml == 1) {
            // 根据条件，判断是否将文章内容转换为 html 格式
            article.setContent(MarkdownToHTMLUtil.markdownToHtmlExtensions(article.getContent()));
        }
        return R.responseJson(Constant.SUCCESS_CODE, "查询文章成功", article);
    }


    // http://localhost:8080/article/getNotice
    @RequestMapping("/getNotice")
    public String getNotice() {
        List<Article> noticeList = articleService.getNotice();
        return R.responseJson(Constant.SUCCESS_CODE, "查询文章成功", noticeList);
    }

    // http://localhost:8080/article/readCount
    @RequestMapping("/readCount")
    public String readCount(Integer id) {
        articleService.setArticleReadCount(id);
        return R.responseJson(Constant.SUCCESS_CODE, "文章阅读数加1", null);
    }

    // http://localhost:8080/article/likeCount
    @RequestMapping("/likeCount")
    public String likeCount(Integer id) {
        articleService.setArticleLikeCount(id);
        System.out.println(id);
        return R.responseJson(Constant.SUCCESS_CODE, "点赞成功", null);
    }

    // http://localhost:8080/article/getTop3
    @RequestMapping({"/getTop3"})
    public String getTop3() {
        HashMap<String, Object> top3ByDate = articleService.getTop3ByDate();
        return R.responseJson(Constant.SUCCESS_CODE, "查询文章成功", top3ByDate);
    }

}
