// 初始化文章：获取所有的文章
(function initArticle() {
    buguAjax({
        method: "get",
        url: '/article/getAll',
        success: function (obj) {
            // 使用数据
            setArticle(obj.data);
        }
    });
}());

// 创建新节点的方法
function getNewArticleNode() {
    let tr = document.createElement('tr');
    tr.innerHTML = ''
        + '<td class="article-id"></td>'
        + '<td class="article-title"></td>'
        + '<td class="article-category"></td>'
        + '<td class="article-create-time"></td>'
        + '<td class="article-update-time"></td>'
        + '<td class="action">'
        + '    <span class="select">'
        + '        <a href="#">浏览</a>'
        + '    </span>'
        + '    <span class="delete">'
        + '        <a href="#">删除</a>'
        + '    </span>'
        + '    <span class="update">'
        + '        <a href="#">编辑</a>'
        + '    </span>'
        + '</td>';
    return tr;
}

// 设置数据的方法
function setArticle(articleList) {
    // 1. 清空节点
    document.querySelector('.main-box .bottom .bottom-box tbody').innerHTML = '';
    // 2. 设置数据【如果为空，则不会遍历集合】
    articleList.forEach(article => {
        let articleEle = getNewArticleNode();
        articleEle.querySelector('.article-id').innerText = article.id;
        articleEle.querySelector('.article-title').innerText = article.title;
        articleEle.querySelector('.article-create-time').innerText = localDateTimeToString(article.createTime);
        articleEle.querySelector('.article-update-time').innerText = localDateTimeToString(article.updateTime);
        articleEle.querySelector('.article-category').innerText = article.category.name;
        document.querySelector('.main-box .bottom .bottom-box tbody').append(articleEle);
    })
    // 3. 为数据添加相关的事件
    setEvent();
}

// 点击按钮进行条件查询的方法
function sendRequestToGetArticle() {
    document.querySelector('.main-box .top form .search').addEventListener('click', function () {
        buguAjax({
            method: "post",
            param: getFormKeyAndValue(document.querySelector('.main-box .top form')),
            url: "/article/getListByCondition",
            success: function (obj) {
                // 1. 打印提示信息
                messagePopByCode(obj.code, obj.msg);
                // 2. 使用数据
                setArticle(obj.data);
            }
        })
    })
}

// 删除文章的方法
function deleteArticle() {
    // 这里是遍历集合，计算页面没有元素，也是遍历一个空的集合，不会报错
    document.querySelectorAll('.main-box .bottom .bottom-box tbody tr').forEach(ArticleButtonBox => {
        ArticleButtonBox.querySelector('.action .delete a').addEventListener('click', function () {
            if (confirm("是否确定删除文章：" + ArticleButtonBox.querySelector('.article-title').innerText)) {
                buguAjax({
                    method: "get",
                    param: {
                        id: ArticleButtonBox.querySelector('.article-id').innerText
                    },
                    url: '/article/delete',
                    success: function (obj) {
                        if (obj.code === 200) {
                            location.reload();
                        } else {
                            messagePopOfSuccess('删除失败');
                        }
                    }
                })
            } else {
                messagePopOfSuccess('取消删除成功');
            }
        })
    });
}

// 编辑文章的方法
function updateArticle() {
    // 这里是遍历集合，计算页面没有元素，也是遍历一个空的集合，不会报错
    document.querySelectorAll('.main-box .bottom .bottom-box tbody tr').forEach(ArticleButtonBox => {
        ArticleButtonBox.querySelector('.action .update a').addEventListener('click', function () {
            if (confirm("是否确定修改文章：" + ArticleButtonBox.querySelector('.article-title').innerText)) {
                let id = ArticleButtonBox.querySelector('.article-id').innerText;
                location.href = '/Blog/page/backend/article-update.html?id=' + id;
            } else {
                messagePopOfSuccess('取消修改成功');
            }
        })
    });
}

// 阅读文章的方法
function readArticle() {
    // 这里是遍历集合，计算页面没有元素，也是遍历一个空的集合，不会报错
    document.querySelectorAll('.main-box .bottom .bottom-box tbody tr').forEach(articleButtonBox => {
        articleButtonBox.querySelector('.action .select a').addEventListener('click', function () {
            let id = articleButtonBox.querySelector('.article-id').innerText;
            location.href = '/Blog/page/front/article.html?id=' + id;
        })
    });
}

// 相关事件的汇总
function setEvent() {
    // 1. 条件查询
    sendRequestToGetArticle();
    // 2. 删除
    deleteArticle();
    // 3. 编辑
    updateArticle();
    // 4. 浏览
    readArticle();
}