/**
 *  @BuGu: 向后台发送请求，获取 articleTop3 数据
 *  ----------分----------割----------线----------分----------割----------线----------分----------割----------线----------
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
 *  @BuGu: 向后台发送请求，获取 notice 数据
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


/**
 *  @BuGu: 点击按钮进行条件查询的方法，获取数据
 *  ----------分----------割----------线----------分----------割----------线----------分----------割----------线----------
 */
(function () {
    let buguRequestObj = {
        // 获取参数
        getCondition: function () {
            let condition = getUrlParam('condition');
            if (condition === null) {
                return "";
            }
            return condition;
        },
        // 创建节点
        getElementNode: function () {
            let li = document.createElement('li');
            li.innerHTML = ''
                + '<a href="">'
                + '    <div class="title"><h1></h1></div>'
                + '    <div class="desc"></div>'
                + '    <div class="other">'
                + '        <svg class="icon">'
                + '            <use href="#icon-shijian"></use>'
                + '        </svg>'
                + '        <span name="date"></span>'
                + '        <svg class="icon">'
                + '            <use href="#icon-yuedu"></use>'
                + '        </svg>'
                + '        <span name="read"></span>'
                + '        <svg class="icon">'
                + '            <use href="#icon-dianzan"></use>'
                + '        </svg>'
                + '        <span name="comment"></span>'
                + '        <svg class="icon">'
                + '            <use href="#icon-pinglun"></use>'
                + '        </svg>'
                + '        <span name="like" class="like"></span>'
                + '        <svg name="tag" class="icon">'
                + '            <use href="#icon-leibie"></use>'
                + '        </svg>'
                + '        <span name="tag"></span>'
                + '    </div>'
                + '</a>';
            return li;
        },
        // 使用数据
        setData: function (articleList) {
            // 1. 清空节点【必须有数据的时候才清空，否则保留一个基本的元素】
            // (articleList.length > 0) && (document.querySelector('#content .main .main-left .left-item .article-box .bd .box ul').innerHTML = '');
            document.querySelector('#content .main .main-left .left-item .article-box .bd .box ul').innerHTML = ''
            // 2. 设置数据
            articleList.forEach(article => {
                let articleEle = buguRequestObj.getElementNode();
                articleEle.querySelector('li a').setAttribute('href', '/Blog/page/front/article.html?id=' + article.id);
                articleEle.querySelector('li a .title h1').innerText = article.title;
                articleEle.querySelector('li a .desc').innerText = article.desc;
                articleEle.querySelector('li a .other span[name="date"]').innerText = localDateTimeToString(article.updateTime);
                articleEle.querySelector('li a .other span[name="tag"]').innerText = article.category.name;
                articleEle.querySelector('li a .other span[name="like"]').innerText = '0';
                articleEle.querySelector('li a .other span[name="comment"]').innerText = '0';
                articleEle.querySelector('li a .other span[name="read"]').innerText = '0';
                document.querySelector('#content .main .main-left .left-item .article-box .bd .box ul').append(articleEle);
            })
        },
        // 请求之前的方法
        preFn: function () {
        },
        // 请求之后的方法
        nextFn: function (msg) {
            messagePopOfWarn(msg);
        },
        // 发送请求
        sendRequest: function () {
            buguRequestObj.preFn();
            buguAjax({
                method: "post",
                param: {
                    condition: buguRequestObj.getCondition(),
                },
                url: "/article/getListByCondition",
                success: function (obj) {
                    buguRequestObj.setData(obj.data);
                    buguRequestObj.nextFn(obj.msg);
                }
            })
        }
    }
    buguRequestObj.sendRequest();
}());


