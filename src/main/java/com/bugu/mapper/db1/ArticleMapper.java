package com.bugu.mapper.db1;

import com.bugu.bean.Article;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface ArticleMapper {

    // insert、delete、update、query

    void insertOne(Article article);

    void deleteOneById(Integer id);

    void updateOneById(Article article);

    List<Article> queryAll();

    Article queryOneById(Integer id);

    List<Article> queryTop3ByDate();

    List<Article> queryListByLikeTitleAndInCategoryId(String title, List<Integer> categoryIds);

    List<Article> queryNoticeByDateTop3();

    Long queryCount();

    List<Article> queryPage(int startIndex, int pageSize);

    void setArticleReadCount(Integer id);

    void setArticleLikeCount(Integer id);
}
