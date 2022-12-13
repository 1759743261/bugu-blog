package com.bugu.service.impl;

import com.bugu.bean.vo.IndexVO;
import com.bugu.mapper.db1.ArticleMapper;
import com.bugu.service.PageService;
import com.bugu.utils.PoetryUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class PageServiceImpl implements PageService {

    @Autowired
    private ArticleMapper articleMapper;


    @Override
    public HashMap<String, String> getBlogId() {
        HashMap<String, String> hashMap = new HashMap<>();
        hashMap.put("title", "备案中ing");
        hashMap.put("href", "#");
        return hashMap;
    }

    @Override
    public String getColor() {
        return "red";
    }

    @Override
    public HashMap<String, Object> getBlogLogo() {
        HashMap<String, Object> map = new HashMap<>();
        map.put("title", "不谷博客");
        map.put("text", "BG123");
        return map;
    }

    public HashMap<String, Object> getLunbotuData() {
        HashMap<String, String> map1 = new HashMap<>();
        map1.put("src", "http://rmi7wxav0.hn-bkt.clouddn.com/Fv2MU_h_9vX9CGoxCgrSnk09LdQE");
        map1.put("href", "#");
        map1.put("title", PoetryUtil.getRandomPoetry());
        HashMap<String, String> map2 = new HashMap<>();
        map2.put("src", "http://rmi7wxav0.hn-bkt.clouddn.com/Fu2VwXwcetCld_Ot11zCO5nbUu_Y");
        map2.put("href", "#");
        map2.put("title", PoetryUtil.getRandomPoetry());
        HashMap<String, String> map3 = new HashMap<>();
        map3.put("src", "http://rmi7wxav0.hn-bkt.clouddn.com/Fuwr0WcwGK3ET95l2BdD9vie71iV");
        map3.put("href", "#");
        map3.put("title", PoetryUtil.getRandomPoetry());
        HashMap<String, String> map4 = new HashMap<>();
        map4.put("src", "http://rmi7wxav0.hn-bkt.clouddn.com/Fv47XtfgCY1l3p9Y6RBZ5QVj_Hbp");
        map4.put("href", "#");
        map4.put("title", PoetryUtil.getRandomPoetry());
        HashMap<String, String> map5 = new HashMap<>();
        map5.put("src", "http://rmi7wxav0.hn-bkt.clouddn.com/Fu6MSWE2vJFb0LiGplNawsrXgjKT");
        map5.put("href", "#");
        map5.put("title", PoetryUtil.getRandomPoetry());
        List<HashMap<String, String>> imgData = Arrays.asList(map2, map3, map1, map4, map5);
        int animateTime = 3000;
        HashMap<String, Object> hashMap = new HashMap<>();
        hashMap.put("imgData", imgData);
        hashMap.put("animateTime", animateTime);
        return hashMap;
    }

    @Override
    public IndexVO getIndexVO() {
        IndexVO indexVo = new IndexVO();
        // 1. 博客标题
        indexVo.setBlogTitle("KS");
        // 2. 获取文章总数
        indexVo.setBlogArticleCount(articleMapper.queryCount());
        // 3. 获取阅读数量
        indexVo.setBlogReadCount(0L);
        // 4. 用户信息模块的背景图片
        indexVo.setBackgroundImageUrl("http://rmi7wxav0.hn-bkt.clouddn.com/FoxoxvXBsqzAwI2U2eIFyuz1sugW");
        // 5. 用户信息模块的用户头像
        indexVo.setUserImageUrl("http://rmi7wxav0.hn-bkt.clouddn.com/FjUbQPO9ugnOi1pL3PiMij1SU0qr");
        // 6. 用户信息模块的用户标题
        indexVo.setUserImageTitle("hh111h");
        return indexVo;
    }
}
