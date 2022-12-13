/**
 *  @BuGu: 博客主题色彩
 *  ----------分----------割----------线----------分----------割----------线----------分----------割----------线----------
 */
(function () {
    buguAjax({
        method: "get",
        url: "/page/getColor",
        success: function (obj) {
            document.documentElement.style.setProperty('--buguColor', obj.data);
        }
    })
}());


/**
 *  @BuGu: 博客Logo的名称
 *  ----------分----------割----------线----------分----------割----------线----------分----------割----------线----------
 */
(function () {
    buguAjax({
        method: "get",
        url: "/page/getBlogLogo",
        success: function (obj) {
            document.querySelector('#header .top .nav .logo h1 a').setAttribute('title', obj.data.title);
            document.querySelector('#header .top .nav .logo h1 a').innerText = obj.data.text;
        }
    })
}());


/**
 *  @BuGu: 博客运行时间
 *  ----------分----------割----------线----------分----------割----------线----------分----------割----------线----------
 */
(function () {
    // 博客第一次开发的时间
    let startTime = new Date('2022-11-11 00:00:00');

    // 获取博客运行时间
    function getBlogRunTime(startTime) {
        let nowTime = new Date().valueOf();
        let blogRunTime = (nowTime - startTime) / 1000;
        let day = Math.floor(blogRunTime / (24 * 60 * 60));
        day = (day < 10) ? "0" + day : day;
        blogRunTime = blogRunTime % (24 * 60 * 60);
        let hour = Math.floor(blogRunTime / (60 * 60));
        hour = (hour < 10) ? "0" + hour : hour;
        blogRunTime = blogRunTime % (60 * 60);
        let minute = Math.floor(blogRunTime / 60);
        minute = (minute < 10) ? "0" + minute : minute;
        blogRunTime = blogRunTime % 60;
        let second = Math.floor(blogRunTime);
        second = (second < 10) ? "0" + second : second;
        return {day, hour, minute, second};
    }

    // 每 200ms 修改一次博客的运行时间
    setInterval(() => {
        let blogRunTimeObj = getBlogRunTime(startTime);
        document.querySelector('#footer .footer-box .blog-run-time .day').innerText = blogRunTimeObj['day'];
        document.querySelector('#footer .footer-box .blog-run-time .hour').innerText = blogRunTimeObj['hour'];
        document.querySelector('#footer .footer-box .blog-run-time .minute').innerText = blogRunTimeObj['minute'];
        document.querySelector('#footer .footer-box .blog-run-time .second').innerText = blogRunTimeObj['second'];
    }, 200);
}());


/**
 *  @BuGu: 网站备案信息
 *  ----------分----------割----------线----------分----------割----------线----------分----------割----------线----------
 */
(function () {
    buguAjax({
        method: "get",
        url: "/page/blogID",
        success: function (obj) {
            document.querySelector('#footer .footer-box .blog-id p a').innerText = obj.data.title;
            document.querySelector('#footer .footer-box .blog-id p a').setAttribute('href', obj.data.href);
        }
    })
}());


/**
 *  @BuGu: 当前在线人数
 *  ----------分----------割----------线----------分----------割----------线----------分----------割----------线----------
 */
(function () {
    buguAjax({
        method: "get",
        url: "/page/getOnline",
        success: function (obj) {
            document.querySelector('#footer .footer-box .online p').innerText = '当前在线'+ obj.data +'人';
        }
    })
}());


/**
 *  @BuGu: 页面的右侧模块的最后一个子模块的固定定位
 *  ----------分----------割----------线----------分----------割----------线----------分----------割----------线----------
 */
(function () {
    // 获取元素的个数，如果只有一个元素，则最后的定位距离需要加上 15 px
    let len = document.querySelectorAll('#content .main .main-right .right-item').length;
    if (len > 0) {
        // 获取最后一个元素
        let positionElement = document.querySelector('#content .main .main-right .right-item:last-child');
        // 元素距离文档顶部距离
        let toHtmlTopHeight = positionElement.offsetTop;

        // 根据条件来决定目录的定位方式
        function setTocPosition() {
            // 获取定位之后距离顶部的高度
            let toTopHeight = document.querySelector('#header .bottom').clientHeight;
            // 获取页面被卷去的距离
            const topScroll = getScrollOfTop();
            // 定位方式
            if (toHtmlTopHeight - topScroll <= toTopHeight + 15) {
                positionElement.style.position = 'fixed';
            } else {
                positionElement.style.position = 'static';
            }
            positionElement.style.top = (len === 1 ? 15 : 0) + 'px';
        }

        // 每次加载页面都需要进行一次判断
        setTocPosition();
        // 页面滚动事件，滚动到一定距离的时候，目录固定住
        document.addEventListener('scroll', function () {
            setTocPosition();
        })
    }
}());


/**
 *  @BuGu: 返回顶部模块
 *  ----------分----------割----------线----------分----------割----------线----------分----------割----------线----------
 */
(function () {
    // 获取小火煎元素
    let returnTopOfRocket = document.querySelector('#side .item-returnTop');
    if (returnTopOfRocket !== null) {
        // 点击小火箭之后页面滚动到顶部的动画
        returnTopOfRocket.addEventListener('click', function () {
            document.documentElement.scrollTo({
                top: 0
            });
        })
        // 设置小火箭定位方式的方法
        function setRocketPosition() {
            // 参考高度
            const headTopHeight = 650;
            // 获取页面被卷去的距离
            const topScroll = getScrollOfTop();
            // 动态设置定位方式
            returnTopOfRocket.style.display = (topScroll >= headTopHeight) ? 'block' : 'none';
        }

        // 每次加载页面都需要进行一次判断
        setRocketPosition();
        // 页面滚动事件触发后：根据页面滚动的距离，设置 "导航栏底部、小火箭" 的定位方式
        document.addEventListener('scroll', function () {
            setRocketPosition();
        })
    }
}());


/**
 *  @BuGu: 点击按钮进行条件查询的方法，跳转到查询页面
 *  ----------分----------割----------线----------分----------割----------线----------分----------割----------线----------
 */
(function () {
    document.querySelector('#header .top .nav .search .search-submit').addEventListener('click', function () {
        let param = getFormKeyAndValue(document.querySelector('#header .top .nav .search form'));
        if (param === 'condition=') {
            messagePopOfWarn('条件不可为空');
            return;
        }
        location.href = "/Blog/page/front/search.html?" + param;
    })
}());


/**
 *  @BuGu: 关于我
 *  ----------分----------割----------线----------分----------割----------线----------分----------割----------线----------
 */
(function () {
    let aboutMe = '/Blog/page/front/article.html?id=2';
    document.querySelector('#header .top .nav .link ul li[id="about-me"] a').setAttribute('href', aboutMe);
}());

