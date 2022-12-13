/**
 *  @BuGu 向后台发送请求，获取 articleList 数据
 *  ----------分----------割----------线----------分----------割----------线----------分----------割----------线----------
 */
(function () {
    let buguRequestObj = {
        // 格式化数据
        parseArticle: function (articleList) {
            let articleMap = new Map();
            articleList.forEach(article => {
                let key = article.createTime.date.year;
                if (articleMap.get(key) === undefined) {
                    articleMap.set(key, []);
                }
                articleMap.get(key).push(article);
            })
            articleMap = sortMap(articleMap, false);
            articleMap.forEach(yearArticle => {
                yearArticle.sort(function (a, b) {
                    if (a.createTime.date.month === b.createTime.date.month) {
                        return -(a.createTime.date.day - b.createTime.date.day);
                    }
                    return -(a.createTime.date.month - b.createTime.date.month);
                })
            })
            return articleMap;
        },
        // 点击按照年份层级缩放
        clickYearTo: function () {
            let yearTitle = document.querySelectorAll('#content .main .main-left .left-item .archives-box .archives-item .year');
            yearTitle.forEach(year => {
                year.addEventListener('click', function () {
                    let article = year.parentNode.querySelector('.article');
                    if (article.getAttribute('is-open') === '0') {
                        article.setAttribute('is-open', '1');
                    } else {
                        article.setAttribute('is-open', '0');
                    }
                })
            })
        },
        // 创建节点
        getElementNodeOfDiv: function () {
            let div = document.createElement('div');
            div.className = 'archives-item';
            div.innerHTML = ''
                + '<div class="year"></div>'
                + '<ul class="article" is-open="0">'
                + '</ul>';
            return div;
        },
        getElementNodeOfLi: function () {
            let li = document.createElement('li');
            li.innerHTML = ''
                + '<a href="">'
                + '    <span class="icon"></span>'
                + '    <span class="article-date"></span>'
                + '    <span class="article-title"></span>'
                + '</a>';
            return li;
        },
        // 使用数据
        setData: function (articleList) {
            document.querySelector('#content .main .main-left .left-item .archives-box').innerHTML = '<h3 class="title">时间轴</h3>';
            articleList.forEach((articleList, year) => {
                let div = buguRequestObj.getElementNodeOfDiv();
                div.querySelector('.year').innerText = year;
                articleList.forEach(article => {
                    let li = buguRequestObj.getElementNodeOfLi();
                    let month = (article.createTime.date.month < 10) ? '0' + article.createTime.date.month : article.createTime.date.month;
                    let day = (article.createTime.date.day < 10) ? '0' + article.createTime.date.day : article.createTime.date.day;
                    li.querySelector('a').setAttribute('href', '/Blog/page/front/article.html?id=' + article.id);
                    li.querySelector('a .article-date').innerText = month + '月' + day + '日';
                    li.querySelector('a .article-title').innerText = article.title;
                    div.querySelector('.article').append(li);
                    document.querySelector('#content .main .main-left .left-item .archives-box').append(div);
                })
            })
        },
        // 请求之前的方法
        preFn: function () {
        },
        // 请求之后的方法
        nextFn: function () {
            buguRequestObj.clickYearTo();
        },
        // 发送请求
        sendRequest: function () {
            buguRequestObj.preFn();
            buguAjax({
                method: "get",
                url: '/article/getAll',
                success: function (obj) {
                    buguRequestObj.setData(buguRequestObj.parseArticle(obj.data));
                    buguRequestObj.nextFn();
                }
            })
        }
    }
    buguRequestObj.sendRequest();
}());


/**
 * @BuGu 向后台发送请求，获取 articleTop3 数据
 */
(function () {
    let buguRequestObj = {
        // 创建节点
        getElementNode: function () {
            let li = document.createElement('li');
            li.innerHTML = ''
                + '<a href="">'
                + '     <div class="img">'
                + '         <img src="" title="">'
                + '     </div>'
                + '     <div class="content">'
                + '         <div class="title"></div>'
                + '         <div class="date"></div>'
                + '     </div>'
                + '</a>';
            return li;
        },
        // 使用数据
        setData: function (articleList, imageList) {
            // (articleList.length > 0) && (document.querySelector('#content .main .main-right .top3 .bd .bd-box ul').innerHTML = '');
            document.querySelector('#content .main .main-right .top3 .bd .bd-box ul').innerHTML = '';
            articleList.forEach((article, index) => {
                    let elementNode = buguRequestObj.getElementNode();
                    elementNode.querySelector('a').setAttribute('href', '/Blog/page/front/article.html?id=' + article.id);
                    elementNode.querySelector('a img').setAttribute('src', imageList[index]);
                    elementNode.querySelector('a img').setAttribute('title', article.title);
                    elementNode.querySelector('a .title').innerText = article.title;
                    elementNode.querySelector('a .date').innerText = localDateTimeToString(article.updateTime);
                    document.querySelector('#content .main .main-right .top3 .bd .bd-box ul').append(elementNode);
                }
            )
        },
        // 请求之前的方法
        preFn: function () {
        },
        // 请求之后的方法
        nextFn: function () {
        },
        // 发送请求
        sendRequest: function () {
            buguRequestObj.preFn();
            buguAjax({
                method: "get",
                url: '/article/getTop3',
                success: function (obj) {
                    buguRequestObj.setData(obj.data.infoList, obj.data.imageList);
                    buguRequestObj.nextFn();
                }
            })
        }
    }
    buguRequestObj.sendRequest();
}());


/**
 *  @BuGu 向后台发送请求，获取 notice 数据
 *  ----------分----------割----------线----------分----------割----------线----------分----------割----------线----------
 */
(function () {
    let buguRequestObj = {
        // 创建节点
        getElementNode: function () {
            let li = document.createElement('li');
            li.innerHTML = ''
                + '<a href="" title="">'
                + '    <span class="title" title=""></span>'
                + '</a>';
            return li;
        },
        // 使用数据
        setData: function (articleList) {
            // (articleList.length > 0) && (document.querySelector('#content .main .main-right .notice .bd .bd-box ul').innerHTML = '');
            document.querySelector('#content .main .main-right .notice .bd .bd-box ul').innerHTML = '';
            articleList.forEach(article => {
                let li = buguRequestObj.getElementNode();
                li.querySelector('a').setAttribute('href', '/Blog/page/front/article.html?id=' + article.id);
                li.querySelector('a').setAttribute('title', article.title);
                li.querySelector('a .title').setAttribute('title', article.title);
                li.querySelector('a .title').innerText = article.title;
                document.querySelector('#content .main .main-right .notice .bd .bd-box ul').append(li);
            })
        },
        // 请求之前的方法
        preFn: function () {
        },
        // 请求之后的方法
        nextFn: function () {
        },
        // 发送请求
        sendRequest: function () {
            buguRequestObj.preFn();
            buguAjax({
                method: "get",
                url: '/article/getNotice',
                success: function (obj) {
                    buguRequestObj.setData(obj.data);
                    buguRequestObj.nextFn();
                }
            })
        }
    }
    buguRequestObj.sendRequest();
}());


