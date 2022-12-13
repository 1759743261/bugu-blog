package com.bugu.service;

import com.bugu.bean.vo.IndexVO;

import java.util.HashMap;

public interface PageService {

    IndexVO getIndexVO();

    HashMap<String, String> getBlogId();

    String getColor();

    HashMap<String, Object> getBlogLogo();

    HashMap<String, Object> getLunbotuData();
}
