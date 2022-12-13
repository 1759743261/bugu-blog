package com.bugu.bean;

import java.time.LocalDateTime;

public class Article {
    private Integer id;
    private String title;
    private String desc;
    private String content;
    private LocalDateTime createTime;
    private LocalDateTime updateTime;
    private Category category;
    private Integer isTop;
    private Long read;
    private Long like;

    public Article() {
    }

    public Article(Integer id, String title, String desc, String content, LocalDateTime createTime, LocalDateTime updateTime, Category category, Integer isTop, Long read, Long like) {
        this.id = id;
        this.title = title;
        this.desc = desc;
        this.content = content;
        this.createTime = createTime;
        this.updateTime = updateTime;
        this.category = category;
        this.isTop = isTop;
        this.read = read;
        this.like = like;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDesc() {
        return desc;
    }

    public void setDesc(String desc) {
        this.desc = desc;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public LocalDateTime getCreateTime() {
        return createTime;
    }

    public void setCreateTime(LocalDateTime createTime) {
        this.createTime = createTime;
    }

    public LocalDateTime getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(LocalDateTime updateTime) {
        this.updateTime = updateTime;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public Integer getIsTop() {
        return isTop;
    }

    public void setIsTop(Integer isTop) {
        this.isTop = isTop;
    }

    public Long getRead() {
        return read;
    }

    public void setRead(Long read) {
        this.read = read;
    }

    public Long getLike() {
        return like;
    }

    public void setLike(Long like) {
        this.like = like;
    }

    @Override
    public String toString() {
        return "Article{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", desc='" + desc + '\'' +
                ", content='" + content + '\'' +
                ", createTime=" + createTime +
                ", updateTime=" + updateTime +
                ", category=" + category +
                ", isTop=" + isTop +
                ", read=" + read +
                ", like=" + like +
                '}';
    }
}
