(function () {
    // 结构初始化
    function lunbotuInit(lunbotuData) {
        let ul = document.querySelector('#content .main .main-left .left-item .show-box .show-lunbotu .lunbotu-box ul');
        lunbotuData.imgData.forEach(lunbotu => {
            let li = document.createElement('li');
            let a = document.createElement('a');
            let img = document.createElement('img');
            a.setAttribute('href', lunbotu.href);
            a.setAttribute('target', '_blank');
            img.setAttribute('src', lunbotu.src);
            img.setAttribute('title', lunbotu.title);
            a.append(img);
            li.append(a);
            ul.append(li);
        })
        // 获取轮播图的第一个节点
        let lunbotuFirstLiNode = ul.querySelector('li:nth-child(1)');
        // 对第一个节点复制出一个新节点并添加到最后的位置
        ul.appendChild(lunbotuFirstLiNode.cloneNode(true));
    }

    // 动画
    function lunbotuAnimate(lunbotuData) {
        // 轮播图————核心元素
        let buguLunbotuUl = document.querySelector('.lunbotu-box ul');
        // 记录当前是第几张图片
        let index = 0;

        // 轮播图————滚动动画的封装
        function buguLunbotuAnimate(lunbotuData) {
            // 代码执行到这里，轮播图现在是第(index+1)张图片
            if (index === lunbotuData.imgData.length) {
                index = 0;
                buguLunbotuUl.style.left = '0';
            }
            // 即将滚动到下一张图片
            index++;
            // 滚动到下一张图片要移动的距离
            let targetDistance = -1300 * index;
            // 轮播图左右移动的动画
            animate(buguLunbotuUl, targetDistance);
        }

        // 轮播图————滚动动画的重复执行
        let lunbotuTimer = setInterval(function () {
            buguLunbotuAnimate(lunbotuData);
        }, lunbotuData.animateTime);
        // 轮播图————鼠标移入，取消动画
        buguLunbotuUl.addEventListener("mouseover", function () {
            clearInterval(lunbotuTimer);
            lunbotuTimer = null;
        })
        // 轮播图————鼠标移出，开启动画
        buguLunbotuUl.addEventListener("mouseleave", function () {
            lunbotuTimer = setInterval(function () {
                buguLunbotuAnimate(lunbotuData);
            }, lunbotuData.animateTime);
        })
    }

    // 请求轮播图数据
    buguAjax({
        method: "get",
        url: "/page/getLunbotu",
        success: function (obj) {
            lunbotuInit(obj.data);
            lunbotuAnimate(obj.data);
        }
    })
}());


/**
 *  @BuGu: 向后台发送请求，获取 IndexVO 数据
 *  ----------分----------割----------线----------分----------割----------线----------分----------割----------线----------
 */
(function () {

    function setData(data) {
        let userBox = document.querySelector('#content .main .main-right .user');
        userBox.querySelector('.hd').style.backgroundImage = 'url(' + data.backgroundImageUrl + ')';
        userBox.querySelector('.hd .user-hd-box a .touxiang').setAttribute('src', data.userImageUrl);
        userBox.querySelector('.hd .user-hd-box a .touxiang').setAttribute('title', data.userImageTitle);
        userBox.querySelector('.bd .user-bd-box .top .name a').innerText = data.blogTitle;
        userBox.querySelector('.bd .user-bd-box .article-count .num').innerText = data.blogArticleCount;
        userBox.querySelector('.bd .user-bd-box .read-count .num').innerText = data.blogReadCount;
    }

    buguAjax({
        method: "get",
        url: "/page/getIndexVO",
        success: function (obj) {
            setData(obj.data);
        }
    })
}());

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
 *  @BuGu: 向后台发送请求，获取 articleList 数据
 *  ----------分----------割----------线----------分----------割----------线----------分----------割----------线----------
 */
(function () {
    let buguRequestObj = {
        // 设置分页参数
        setPageParam: function (isNextPage) {
            document.querySelector('#content .main .main-left .left-item .article-box').dataset.isNextPage = isNextPage;
        },
        // 创建节点
        getElementNode: function () {
            let li = document.createElement('li');
            li.innerHTML = ''
                + '<a href="">'
                + '        <div class="title"><h1></h1></div>'
                + '        <div class="desc"></div>'
                + '        <div class="other">'
                + '            <svg class="icon">'
                + '                <use href="#icon-shijian"></use>'
                + '            </svg>'
                + '            <span name="date"></span>'
                + '            <svg class="icon">'
                + '                <use href="#icon-yuedu"></use>'
                + '            </svg>'
                + '            <span name="read"></span>'
                + '            <svg class="icon">'
                + '                <use href="#icon-dianzan"></use>'
                + '            </svg>'
                + '            <span name="like"></span>'
                + '            <svg class="icon">'
                + '                <use href="#icon-pinglun"></use>'
                + '            </svg>'
                + '            <span name="comment" class="like"></span>'
                + '            <svg name="tag" class="icon">'
                + '                <use href="#icon-leibie"></use>'
                + '            </svg>'
                + '            <span name="tag"></span>'
                + '        </div>'
                + '</a>';
            return li;
        },
        // 使用数据
        setData: function (articleList) {
            // 1. 清空节点【必须有数据的时候才清空，否则保留一个基本的元素】
            // (articleList.length > 0) && (document.querySelector('#content .main .main-left .left-item .article-box .bd .box ul').innerHTML = '');
            document.querySelector('#content .main .main-left .left-item .article-box .bd .box ul').innerHTML = '';
            // 2. 设置数据
            articleList.forEach(article => {
                let articleEle = buguRequestObj.getElementNode();
                articleEle.querySelector('li a').setAttribute('href', '/Blog/page/front/article.html?id=' + article.id);
                articleEle.querySelector('li a').setAttribute('title', article.title);
                articleEle.querySelector('li a .title h1').innerText = article.title;
                articleEle.querySelector('li a .desc').innerText = article.desc;
                articleEle.querySelector('li a .other span[name="date"]').innerText = localDateTimeToString(article.createTime);
                articleEle.querySelector('li a .other span[name="tag"]').innerText = article.category.name;
                articleEle.querySelector('li a .other span[name="like"]').innerText = article.like;
                articleEle.querySelector('li a .other span[name="comment"]').innerText = '0';
                articleEle.querySelector('li a .other span[name="read"]').innerText = article.read;
                if (article.isTop >= 1) {
                    let span = document.createElement('span');
                    span.className = 'top'
                    span.innerText = '置顶';
                    articleEle.append(span);
                }
                document.querySelector('#content .main .main-left .left-item .bd .box ul').append(articleEle);
            })
        },
        // 请求之前的方法
        preFn: function () {
        },
        // 请求之后的方法
        nextFn: function (isNextPage) {
            buguRequestObj.setPageParam(isNextPage);
            getArticleByPage();
        },
        // 发送请求
        sendRequest: function () {
            buguRequestObj.preFn();
            buguAjax({
                method: "get",
                param: {
                    nowPage: 1,
                    pageSize: 5,
                },
                url: '/article/getPage',
                success: function (obj) {
                    buguRequestObj.setData(obj.data.articleList);
                    buguRequestObj.nextFn(obj.data.isNextPage);
                }
            })
        }
    }
    buguRequestObj.sendRequest();
}());


/**
 *  @BuGu: 滚动分页加载
 *  ----------分----------割----------线----------分----------割----------线----------分----------割----------线----------
 */
function getArticleByPage() {
    let buguRequestObj = {
        // 相关的数据
        data: {
            flag: true,
            nowPage: 2,
        },
        // 设置分页参数
        setPageParam: function (isNextPage) {
            document.querySelector('#content .main .main-left .left-item .article-box').dataset.isNextPage = isNextPage;
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
                + '        <span name="like"></span>'
                + '        <svg class="icon">'
                + '            <use href="#icon-pinglun"></use>'
                + '        </svg>'
                + '        <span name="comment" class="like"></span>'
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
            articleList.forEach(article => {
                let articleEle = buguRequestObj.getElementNode();
                articleEle.querySelector('li a').setAttribute('href', '/Blog/page/front/article.html?id=' + article.id);
                articleEle.querySelector('li a').setAttribute('title', article.title);
                articleEle.querySelector('li a .title h1').innerText = article.title;
                articleEle.querySelector('li a .desc').innerText = article.desc;
                articleEle.querySelector('li a .other span[name="date"]').innerText = localDateTimeToString(article.createTime);
                articleEle.querySelector('li a .other span[name="tag"]').innerText = article.category.name;
                articleEle.querySelector('li a .other span[name="like"]').innerText = article.like;
                articleEle.querySelector('li a .other span[name="comment"]').innerText = '0';
                articleEle.querySelector('li a .other span[name="read"]').innerText = article.read;
                document.querySelector('#content .main .main-left .left-item .bd .box ul').append(articleEle);
            })
        },
        // 请求之前的方法
        preFn: function () {
        },
        // 请求之后的方法
        nextFn: function (isNextPage) {
            buguRequestObj.setPageParam(isNextPage);
            buguRequestObj.data.flag = true;
        },
        // 发送请求
        sendRequest: function () {
            buguRequestObj.preFn();
            buguAjax({
                method: "get",
                param: {
                    nowPage: buguRequestObj.data.nowPage++,
                    pageSize: 5,
                },
                url: '/article/getPage',
                success: function (obj) {
                    buguRequestObj.setData(obj.data.articleList);
                    buguRequestObj.nextFn(obj.data.isNextPage);
                }
            })
        }
    }

    // 滚动发送请求
    let scrollFlag = true;
    document.addEventListener('scroll', function () {
        if (scrollFlag) {
            if (getDistantToBottom() < 10) {
                if (buguRequestObj.data.flag) {
                    if (document.querySelector('#content .main .main-left .left-item .article-box').dataset.isNextPage === '1') {
                        buguRequestObj.data.flag = false;
                        buguRequestObj.sendRequest();
                    } else {
                        messagePopOfWarn('没有数据了');
                        scrollFlag = false;
                    }
                } else {
                    messagePopOfWarn('请求频繁');
                }
            }
        }
    })

}



/**
 *  @BuGu: 临时的user模块的fo模块隐藏
 *  ----------分----------割----------线----------分----------割----------线----------分----------割----------线----------
 */
(function () {
    document.querySelector('#content .main .main-right .user .fo').style.display = 'none';
}());
