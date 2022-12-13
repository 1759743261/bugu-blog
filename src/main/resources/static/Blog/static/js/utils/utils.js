/**
 *
 *  ns 后跳转
 *  ----------分----------割----------线----------分----------割----------线----------分----------割----------线----------
 *  ----------分----------割----------线----------分----------割----------线----------分----------割----------线----------
 */
function jumpToPage(n, url) {
    setInterval(function () {
        if (n === 0) {
            location.href = url;
        } else {
            n--;
        }
    }, 1000);
}


/**
 *
 *  获取页面滚动的距离
 *  ----------分----------割----------线----------分----------割----------线----------分----------割----------线----------
 *  ----------分----------割----------线----------分----------割----------线----------分----------割----------线----------
 */
function getScrollOfTop() {
    return window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0
};


/**
 *
 *  Java 的 LocalDateTime ===> String
 *  ----------分----------割----------线----------分----------割----------线----------分----------割----------线----------
 *  ----------分----------割----------线----------分----------割----------线----------分----------割----------线----------
 */
function localDateTimeToString(localDateTime) {
    let month = (localDateTime.date.month < 10) ? '0' + localDateTime.date.month : localDateTime.date.month;
    let day = (localDateTime.date.day < 10) ? '0' + localDateTime.date.day : localDateTime.date.day;
    let date = localDateTime.date.year + '-' + month + '-' + day;
    return date;
};

/**
 *
 *  计算时间戳之间的相差的天数
 *  ----------分----------割----------线----------分----------割----------线----------分----------割----------线----------
 */
function getDayByTimestamp(a, b) {
    let c = a - b;
    c = (c > 0) ? c : -c;
    return Math.floor(c / (24 * 60 * 60 * 1000));
};


function getScrollOfLeft() {
    return window.pageXOffset ||
        document.documentElement.scrollLeft ||
        document.body.scrollLeft ||
        0
};


function solvePostData(postData) {
    postData = postData.replace(/&/g, "qwe389123");
    postData = postData.replace(/%/g, "qwe389124");
    return postData;
}

function unSolvePostData(postData) {
    postData = postData.replace(/qwe389123/g, "&");
    postData = postData.replace(/qwe389124/g, "%");
    return postData;
}


/**
 *  页面被卷去的距离，各种兼容问题的解决
 *      - window.pageYOffset                   // 1. 【ie9】
 *      - document.body.scrollTop              // 2. 【没有声明DTD】
 *      - document.documentElement.scrollTop   // 3. 【声明了DTD】
 *  获取页面被卷去的距离的兼容函数————getScroll()
 *      - 返回一个对象，对象有left、top两个属性
 *      - obj {
 *          left: {},
 *          top: {}
 *       }
 */
function getScroll() {
    return {
        left: getScrollOfLeft(),
        top: getScrollOfTop()
    }
};


/**
 *
 *  获取随机数
 *  ----------分----------割----------线----------分----------割----------线----------分----------割----------线----------
 *  ----------分----------割----------线----------分----------割----------线----------分----------割----------线----------
 */


/**
 *  获取一个指定范围内的随机整数：[min, max]
 */
function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

// 在[1, n]的整数中，随机的找到m个不重复的元素【第一种方法】
function getRandomList_1(n, m) {
    let randomList = [];
    let count = 0;
    while (count < m) {
        let flag = true;
        const tempNum = getRandom(1, n);
        for (let index = 0; index < count; index++) {
            if (randomList[index] === tempNum) {
                flag = false;
                break;
            }
        }
        if (flag) {
            count++;
            randomList.push(tempNum);
        }
    }
    return randomList;
};

// 在[1, n]的整数中，随机的找到m个不重复的元素【第二种方法】
function getRandomList_2(n, m) {
    let a = [];
    let b = [];
    let max = n;
    for (let i = 0; i < n; i++) {
        b.push(i + 1);
    }
    for (let i = 0; i < m; i++) {
        const tempNum = getRandom(0, max - 1);
        a[i] = b[tempNum];
        // console.log('本次索引为：' + tempNum);
        // console.log('对应的数为：' + b[tempNum]);
        // console.log('------------------');
        b[tempNum] = b[max - 1];
        max--;
    }
    return a;
};


/**
 *
 *  元素左右移动的动画
 *  ----------分----------割----------线----------分----------割----------线----------分----------割----------线----------
 *  ----------分----------割----------线----------分----------割----------线----------分----------割----------线----------
 */


/**
 *  左右移动的动画
 *      - 动画的核心原理：通过定时器 setInterval() 不断的修改盒子的位置
 *      - 匀速动画 -- 盒子当前的位置  +  固定的值 10
 *      - 缓动动画 -- 盒子当前的位置  +  变化的值(目标值 - 现在的位置) / 10）
 */


/**
 * 设置obj元素通过定位的left属性，进行左右移动的动画函数的封装
 *      - 【速度逐渐变慢】
 *      - 【通过定时执行动画来实现CSS的过渡效果】
 * @param obj 要移动的元素
 * @param target 要移动的距离
 * @param firstFun 前置函数
 * @param callbackFun 回调函数
 * @param time 每 time ms 执行一次动画
 */
function animate(obj, target, firstFun, callbackFun, time = 10) {
    // 1. 是否有前置函数
    firstFun && firstFun();
    // 2. 清除obj以前的定时器
    clearInterval(obj.timer);
    // 3. 给obj添加计时器【循环执行的定时器】
    obj.timer = setInterval(() => {
        // 4. 处理obj元素一步走多少px【注意：一步用时是10ms】
        /**
         *  offsetLeft      target   1      2  3  4  5  6  7  8  9  10
         *      0            -100    -10
         *     -10           -100    -9
         *     -19           -100    -8.1
         *     -27.1
         *  速度越来越慢
         */
        let step = (target - obj.offsetLeft) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        // 5. 停止动画 本质是停止定时器
        if (obj.offsetLeft === target) {
            clearInterval(obj.timer);
            // 6. 是否有回调函数
            callbackFun && callbackFun();
        }
        // 7. 每次移动的距离等于步长
        obj.style.left = obj.offsetLeft + step + 'px';
    }, time);
};


// 向上移动
function animateOfToTop(obj, target, firstFn, callbackFn) {
    // 前置函数
    firstFn && firstFn();
    // 清除obj以前的定时器
    clearInterval(obj.timer);
    // 计数器
    let times = 0;
    // 给obj添加定时器
    obj.timer = setInterval(() => {
        // 第几次
        times--;
        // 一步走多少px
        let step = 100;
        // 停止动画 本质是停止定时器
        if (times <= 0) {
            clearInterval(obj.timer);
            // 回调函数
            callbackFn && callbackFn();
        }
        // 每次移动的距离等于步长
        obj.style.transform = 'translateY(-' + (times * step) + 'px)';

    }, 10);
};


/**
 *
 *  检查字符串是否合法
 *  ----------分----------割----------线----------分----------割----------线----------分----------割----------线----------
 *  ----------分----------割----------线----------分----------割----------线----------分----------割----------线----------
 */


// 验证信息的统一封装
let buguReg = function (str, minLen = 6, maxLen = 18) {

    // 字符串长度验证：[minLne, maxLen]
    function checkStringLength(str, minLen = 6, maxLen = 18) {
        return (str.length >= minLen && str.length <= maxLen)
    }


    // 手机号码验证：11位数字，以1开头
    function checkPhone(str) {
        return new RegExp('^1[3456789][0-9]{9}$').test(str);
    }


    // QQ号码验证：QQ号码从10000开始
    function checkEmail(str) {
        return new RegExp('^[1-9][0-9]{4,10}$').test(str);
    }


    // QQ邮箱验证：QQ号码从10000开始
    function checkEmail(str) {
        return new RegExp('^[1-9][0-9]{4,10}@qq.com$').test(str);
    }

    return {
        'stringLen': (str.length >= minLen && str.length <= maxLen),
        'phone': new RegExp('^1[3456789][0-9]{9}$').test(str),
        'qq': new RegExp('^[1-9][0-9]{4,10}$').test(str),
        'qqEmail': new RegExp('^[1-9][0-9]{4,10}@qq.com$').test(str),
    }
};


/**
 *
 *  原生JavaScript的异步请求
 *  ----------分----------割----------线----------分----------割----------线----------分----------割----------线----------
 *  ----------分----------割----------线----------分----------割----------线----------分----------割----------线----------
 */


/**
 传入请求参数对象
 返回格式化之后的字符串对象【 "name=wxl&age=16" 】
 */
function parseUrlParam(obj) {
    if (typeof obj === 'string')
        return obj;
    let str = '';
    for (let attr in obj) {
        str += attr + "=" + obj[attr] + "&";
    }
    return str.substring(0, str.length - 1);
};


/**
 传入【 "name=wxl&age=16" 】请求参数
 返回 map 对象
 */
function unParseUrlParam(params) {
    let ret = {};
    let keyAndValues = params.split('&');
    keyAndValues.forEach(keyAndValue => {
        let tmp = keyAndValue.split('=');
        ret[tmp[0]] = tmp[1];
    })
    return ret;
};


// 是不是数字的判断
function isIntNumber(val) {
    let reg = /^\d+$/
    let pattern = new RegExp(reg);
    return pattern.test(val);
}


// 从 url 中获取参数
function getUrlParam(key) {
    return new URLSearchParams(location.search).get(key);
}


/**
 【【【【POST请求未进行测试】】】】
 method          请求方式：get、post【=== 默认为get ===】
 url             请求url路径
 param           请求的参数【以对象的形式传递参数，后续】
 success         成功以后执行的函数
 contentType     返回结果的数据类型：json、string【=== 默认为json ===】
 */
function buguAjax({
                      method = "get",
                      param,
                      url,
                      success,
                      result = (ret) => buguLog(url + '   ===>>>   请求' + ret + '！！！'),
                      type = "json",
                      async = true
                  }) {
    // 1. 创建请求对象
    const xhr = new XMLHttpRequest();
    // 2. get请求
    if (method === "get" || method === 'GET') {
        // (1) 直接拼接 url
        param && (url = url + "?" + parseUrlParam(param));
        // (2) 设置请求的信息：请求⽅式, 请求地址, 是否异步【默认为true代表异步请求】
        xhr.open('get', url, async);
        // (3) 直接发送请求
        xhr.send();
    }
    // 3. post请求
    if (method === "post" || method === 'POST') {
        // (1) 设置请求的信息
        xhr.open('POST', url, true);
        // (2) 设置提交的数据格式
        xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
        // (3) 判断是否是携带参数的post请求
        param ? xhr.send(parseUrlParam(param)) : xhr.send();
    }
    if (async) {
        // 4. 监听 ajax 对象的 readyState 值的改变
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    let data = xhr.response;
                    if (type === "json") {
                        data = JSON.parse(data);
                    }
                    success ? success(data) : result('成功');
                } else {
                    result('失败');
                }
            }
        }
    } else {
        // 4. 监听 ajax 对象的 readyState 值的改变
        let data = xhr.response;
        if (type === "json") {
            data = JSON.parse(data);
        }
        success ? success(data) : result('成功');
    }
};


/**
 *
 *  获取元素节点
 *  ----------分----------割----------线----------分----------割----------线----------分----------割----------线----------
 *  ----------分----------割----------线----------分----------割----------线----------分----------割----------线----------
 */


// 获取下一个兄弟元素节点
function getNextNode(ele) {
    ele = ele.nextSibling;
    while (ele) {
        if (ele.nodeType == 1) {
            return ele;
        }
        ele = ele.nextSibling;
    }
    return null;
};


// 获取上一个兄弟元素节点
function getPreNode(ele) {
    ele = ele.previousSibling;
    while (ele) {
        if (ele.nodeType == 1) {
            return ele;
        }
        ele = ele.previousSibling;
    }
    return null;
};


/**
 *
 *  结束
 *  ----------分----------割----------线----------分----------割----------线----------分----------割----------线----------
 *  ----------分----------割----------线----------分----------割----------线----------分----------割----------线----------
 */


// 获取表单对象里面的所有表单输入项目的键值对
function getFormKeyAndValue(formObj) {
    let inputs = formObj.querySelectorAll('input');
    let str = "";
    inputs.forEach(inp => {
        if (inp.getAttribute('name') !== null && inp.getAttribute('type') !== 'hidden') {
            str += inp.getAttribute('name') + "=" + inp.value + "&";
        }
    })
    return str.substring(0, str.length - 1);
};


/**
 *
 *  打印提示信息
 *  ----------分----------割----------线----------分----------割----------线----------分----------割----------线----------
 */
function buguLog(info1, isAlert = false) {
    let info2 = 'By BuGu';
    let style1 = 'color: #fadfa3; background: #030307; padding:8px 0; border-radius: 0 0 0 15px';
    let style2 = 'background: #fadfa3; padding:8px 0; border-radius: 0 15px 0 0';
    console.log('\n%c  ' + info1 + ' %c ' + info2 + '  \n', style1, style2);
    isAlert && alert(info1);
};


// 获取当前视图底部距离内容底部的距离
function getDistantToBottom() {
    let offsetHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight); // 内容高度
    let clientHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 0; //视窗高度
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0; //滚动条滚动高度
    return offsetHeight - clientHeight - scrollTop;
}



// 对 map 进行排序，根据 key 进行排序
function sortMap(map, isKeyUpSort) {
    let keys = [];
    for (let key of map.keys()) {
        keys.push(key)
    }
    if (isKeyUpSort) {
        keys.sort(function (key1, key2) {
            return key1 - key2
        })
    } else {
        keys.sort(function (key1, key2) {
            return key2 - key1
        })
    }
    let newMap = new Map()
    keys.forEach(key => {
        newMap.set(key, map.get(key))
    })
    return newMap
}
