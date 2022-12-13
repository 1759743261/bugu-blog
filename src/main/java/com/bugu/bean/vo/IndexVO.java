package com.bugu.bean.vo;

import java.util.ArrayList;

public class IndexVO {

    private String blogTitle;
    private Long blogArticleCount;
    private Long blogReadCount;
    private String backgroundImageUrl;
    private String userImageUrl;
    private String userImageTitle;
    private ArrayList<String> articleTop3Image;

    public IndexVO() {
    }

    public ArrayList<String> getArticleTop3Image() {
        return articleTop3Image;
    }

    public void setArticleTop3Image(ArrayList<String> articleTop3Image) {
        this.articleTop3Image = articleTop3Image;
    }

    public String getBlogTitle() {
        return blogTitle;
    }

    public void setBlogTitle(String blogTitle) {
        this.blogTitle = blogTitle;
    }

    public Long getBlogArticleCount() {
        return blogArticleCount;
    }

    public void setBlogArticleCount(Long blogArticleCount) {
        this.blogArticleCount = blogArticleCount;
    }

    public Long getBlogReadCount() {
        return blogReadCount;
    }

    public void setBlogReadCount(Long blogReadCount) {
        this.blogReadCount = blogReadCount;
    }

    public String getBackgroundImageUrl() {
        return backgroundImageUrl;
    }

    public void setBackgroundImageUrl(String backgroundImageUrl) {
        this.backgroundImageUrl = backgroundImageUrl;
    }

    @Override
    public String toString() {
        return "IndexVO{" +
                "blogTitle='" + blogTitle + '\'' +
                ", blogArticleCount=" + blogArticleCount +
                ", blogReadCount=" + blogReadCount +
                ", backgroundImageUrl='" + backgroundImageUrl + '\'' +
                ", userImageUrl='" + userImageUrl + '\'' +
                ", userImageTitle='" + userImageTitle + '\'' +
                ", articleTop3Image=" + articleTop3Image +
                '}';
    }

    public String getUserImageUrl() {
        return userImageUrl;
    }

    public void setUserImageUrl(String userImageUrl) {
        this.userImageUrl = userImageUrl;
    }

    public String getUserImageTitle() {
        return userImageTitle;
    }

    public void setUserImageTitle(String userImageTitle) {
        this.userImageTitle = userImageTitle;
    }
}
