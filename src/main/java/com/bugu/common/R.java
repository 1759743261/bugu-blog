package com.bugu.common;

import com.google.gson.Gson;

import java.util.HashMap;
import java.util.Map;

public class R {

    private Integer code;
    private String msg;
    private Object data;
    private Map<String, Object> map = new HashMap<>();

    public static R response(Integer code, String msg, Object data) {
        R r = new R();
        r.code = code;
        r.msg = msg;
        r.data = data;
        return r;
    }

    public static String responseJson(Integer code, String msg, Object data) {
        R r = new R();
        r.code = code;
        r.msg = msg;
        r.data = data;
        return new Gson().toJson(r);
    }

    public void add(String key, Object obj) {
        map.put(key, obj);
    }

}