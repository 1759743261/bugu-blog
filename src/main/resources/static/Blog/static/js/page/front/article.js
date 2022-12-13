// 获取参数
function getIdByParams() {
    let id = getUrlParam('id');
    if (id === null) {
        return "";
    }
    return isIntNumber(id) ? id : "";
}


// 设置数据
function setData(article) {
    // 1
    document.querySelector('#content .main .main-left .left-item .article-box .article-hd .item-1 .title h1').innerText = article.title;
    // 2
    document.querySelector('#content .main .main-left .left-item .article-box .article-hd .item-2 .info ul li[class="read"] span').innerText = article.read;
    document.querySelector('#content .main .main-left .left-item .article-box .article-hd .item-2 .info ul li[class="like"] span').innerText = article.like;
    document.querySelector('#content .main .main-left .left-item .article-box .article-hd .item-2 .info ul li[class="comment"] span').innerText = '00';
    document.querySelector('#content .main .main-left .left-item .article-box .article-hd .item-2 .info ul li[class="date"] span').innerText = localDateTimeToString(article.createTime);
    document.querySelector('#content .main .main-left .left-item .article-box .article-hd .item-2 .info ul li[class="category"] a').setAttribute('href', '/Blog/page/front/search.html?condition=' + article.category.name);
    document.querySelector('#content .main .main-left .left-item .article-box .article-hd .item-2 .info ul li[class="category"] a span').innerText = article.category.name;
    document.querySelector('#content .main .main-left .left-item .article-box .article-hd .item-2 .editor a').setAttribute('href', '/Blog/page/backend/article-update.html?id=' + article.id);
    // 3
    let nowTime = new Date().getTime();
    let updateTime = new Date(localDateTimeToString(article.updateTime)).getTime();
    let updateTimeDiv = document.querySelector('#content .main .main-left .left-item .article-box .article-hd .item-3 .update-time');
    updateTimeDiv.innerText = '本文最后更新于' + localDateTimeToString(article.updateTime) + '，已超过' + getDayByTimestamp(nowTime, updateTime) + '天没有更新，若内容或图片失效，可发送邮件至：1759743261@qq.com';
    // 4
    document.querySelector('#content .main .main-left .left-item .article-box .article-bd').innerHTML = unSolvePostData(article.content);
}


/**
 *  @BuGu: 请求文本
 *  ----------分----------割----------线----------分----------割----------线----------分----------割----------线----------
 */
(function () {

    // 阅读量加1
    function setReadCount(articleId) {
        buguAjax({
            method: "get",
            param: {
                id: articleId,
            },
            url: "/article/readCount",
        })
    }


    let articleId = getIdByParams();
    if (articleId === "") {
        messagePopOfWarn('参数错误');
        return
    }
    buguAjax({
        method: "get",
        param: {
            id: articleId,
            isToHtml: 1,
        },
        url: "/article/getById",
        success: function (obj) {
            setData(obj.data);
            createToc();
            clickToCopyCode();
            // 阅读量加1
            setReadCount(articleId);
        },
    })
}());


/**
 *  @BuGu: 动态生成目录【必须存在】
 *  ----------分----------割----------线----------分----------割----------线----------分----------割----------线----------
 */
function createToc() {
    let tocBox = document.querySelector('#content .main .main-right .toc .bd .bd-box');
    let selects = [
        '#content .main .main-left .article-box .article-bd>h1',
        '#content .main .main-left .article-box .article-bd>h2',
        '#content .main .main-left .article-box .article-bd>h3',
    ]
    let titles = document.querySelectorAll(selects.join(','));
    titles.forEach(ele => {
        let div = document.createElement('div');
        div.innerHTML = '<a href="" title=""></a>';
        div.className = 'item-toc';
        if (ele.tagName === 'H1') {
            div.setAttribute('level', '1');
        } else if (ele.tagName === 'H2') {
            div.setAttribute('level', '2');
        } else if (ele.tagName === 'H3') {
            div.setAttribute('level', '3');
        }
        div.querySelector('a').setAttribute('href', '#' + ele.getAttribute('id'));
        div.querySelector('a').setAttribute('title', ele.innerText);
        div.querySelector('a').innerText = ele.innerText;
        // 添加组装好的元素到盒子中
        tocBox.append(div);
    })
    // let div = document.createElement('div');
    // div.className = 'item-toc';
    // div.innerHTML = '<a href="" title=""></a>';
    // div.setAttribute('level', '1');
    // div.querySelector('a').setAttribute('href', '#' + titles[titles.length - 1].getAttribute('id'));
    // div.querySelector('a').setAttribute('title', '返回顶部');
    // div.querySelector('a').innerText = '返回顶部';
    // tocBox.append(div);
}


/**
 *  @BuGu: 折叠目录
 *  ----------分----------割----------线----------分----------割----------线----------分----------割----------线----------
 */
(function () {
    let tocButton = document.querySelector('#content .main .main-right .toc .hd .hd-box .svg');
    tocButton.addEventListener('click', function () {
        let ele = document.querySelector('#content .main .main-right .toc .bd .bd-box');
        if (ele.getAttribute('flag') === '1') {
            ele.setAttribute('flag', '0');
        } else {
            ele.setAttribute('flag', '1');
        }
    })
}());


/**
 *  @BuGu: 点击复制
 *  ----------分----------割----------线----------分----------割----------线----------分----------割----------线----------
 */
function clickToCopyCode() {
    document.querySelectorAll('#content .main .main-left .left-item .article-box .article-bd pre').forEach(ele => {
        let div = document.createElement('div');
        div.innerText = '复制';
        div.className = 'copy-code-btn';
        div.addEventListener('click', function () {
            const textarea = document.createElement('textarea');
            document.body.appendChild(textarea);
            textarea.innerHTML = ele.querySelector('code').innerText;
            textarea.select();
            document.execCommand("Copy");
            textarea.remove();
            messagePopOfSuccess('复制成功');
        })
        ele.insertBefore(div, ele.children[0]);
    })
};


// 点赞
(function () {
    document.querySelector('.article-fo .like').addEventListener('click', function () {
        let articleId = getIdByParams();
        buguAjax({
            method: 'get',
            param: {
                id: articleId,
            },
            url: '/article/likeCount',
            success: function (obj) {
                messagePopByCode(obj.code, obj.msg);
            }
        })
    })
}());

