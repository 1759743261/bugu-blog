// 获取参数
function getIdByParams() {
    let args = location.href.split('?');
    if (args.length <= 1 || args[1] === "") {
        return "";
    } else {
        let id = unParseUrlParam(args[1]).id;
        return isIntNumber(id) ? id : "";
    }
};


// 获取节点
function getElement() {
    let obj = {};
    obj.id = document.querySelector('.main-box form input[name="id"]');
    obj.title = document.querySelector('.main-box form input[name="title"]');
    obj.desc = document.querySelector('.main-box form textarea[name="desc"]');
    obj.content = document.querySelector('.main-box form textarea[name="content"]');
    obj.submit = document.querySelector('.main-box form input[type="submit"]');
    obj.select = document.querySelector('.main-box form select');
    obj.isTopBtn = document.querySelectorAll('.main-box form input[type="radio"]');
    return obj;
};


// 发送请求
function updateArticle() {
    document.querySelector('.main-box form input[type="submit"]').addEventListener('click', function () {
        // 1. 获取参数
        let param = {};
        param.id = document.querySelector('.main-box form input[name="id"]').value;
        param.title = document.querySelector('.main-box form input[name="title"]').value;
        param.desc = document.querySelector('.main-box form textarea[name="desc"]').value;
        param.content = document.querySelector('.main-box form textarea[name="content"]').value;
        param.content = solvePostData(param.content);
        // 后续需要处理分类为空的情况
        let selectIndex = document.querySelector('.main-box form select').selectedIndex;
        let optionEle = document.querySelectorAll(".main-box form select option")[selectIndex];
        param.categoryId = optionEle.id;
        document.querySelectorAll('.main-box form input[type="radio"]').forEach(radio => {
            if (radio.checked) {
                param.isTop = radio.getAttribute('value');
            }
        })
        // 2. 发送请求
        buguAjax({
            method: "post",
            param: param,
            url: "/article/update",
            success: function (obj) {
                messagePopByCode(obj.code, obj.msg);
                jumpToPage(1, '/Blog/page/backend/article-list.html')
            },
        })
    })
};


// 获取文章数据
function getArticleById(articleId) {
    let article = null;
    buguAjax({
            method: "get",
            param: {
                id: articleId,
                isToHtml: 0,
            },
            url: "/article/getById",
            async: false,
            success: function (obj) {
                article = {
                    id: obj.data.id,
                    title: obj.data.title,
                    desc: obj.data.desc,
                    content: unSolvePostData(obj.data.content),
                    category: {
                        id: obj.data.category.id,
                    },
                    isTop: obj.data.isTop,
                };
            },
        },
    );
    return article;
};


// 请求文章数据
(function () {
    buguAjax({
        method: "get",
        url: "/category/getAll",
        success: function (obj) {
            // 获取到请求参数 id
            let articleId = getIdByParams();
            if (articleId === "") {
                messagePopOfWarn('参数错误');
                return
            }
            // 获取全部的分类数据，并设置分类数据
            let categories = obj.data;
            categories.forEach(category => {
                let optionElement = document.createElement('option');
                optionElement.innerText = category.name;
                optionElement.setAttribute('value', category.name);
                optionElement.setAttribute('id', category.id);
                document.querySelector('.main-box form select').append(optionElement);
            })
            // 请求文章数据
            let articleObj = getArticleById(articleId);
            // 设置文章的数据
            let nodeMap = getElement();
            nodeMap.select.querySelector('option[id="' + articleObj.category.id + '"]').setAttribute('selected', 'selected');
            nodeMap.id.setAttribute('value', articleObj.id);
            nodeMap.title.setAttribute('value', articleObj.title);
            nodeMap.desc.value = articleObj.desc;
            nodeMap.content.value = articleObj.content;
            if (articleObj.isTop >= 1) {
                nodeMap.isTopBtn[0].setAttribute('checked', 'checked');
            } else {
                nodeMap.isTopBtn[1].setAttribute('checked', 'checked');
            }
            // 发送编辑的请求
            updateArticle();
        },
    })
}());


// 上传图片
(function () {
    let domain = 'http://rmi7wxav0.hn-bkt.clouddn.com/';
    function getQiniuToken() {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', "/common/getImageToken", false);
        xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
        xhr.send()
        return JSON.parse(xhr.response).data;
    }

    let fileInput = document.querySelector('.image input[type=file]');
    fileInput.addEventListener('change', function () {
        // (1) 获取 token
        let token = getQiniuToken();
        // (2) 将图片转为 base64 格式的字符串
        let imageList = [];
        for (let i = 0; i < fileInput.files.length; i++) {
            let reader = new FileReader();
            reader.readAsDataURL(fileInput.files[i]);
            reader.addEventListener('load', function (e) {
                imageList.push({
                    name: fileInput.files[i].name,
                    base64: reader.result.split(',')[1],
                });
            });
        }
        // (3) 上传图片
        let submitButton = document.querySelector('.image #sub');
        submitButton.addEventListener('click', function () {
            imageList.forEach(imageBase64 => {
                const xhr = new XMLHttpRequest();
                xhr.open("POST", "http://upload-z2.qiniup.com/putb64/-1", true);
                xhr.setRequestHeader("Content-Type", "application/octet-stream");
                xhr.setRequestHeader("Authorization", "UpToken " + token);
                xhr.send(imageBase64.base64);
                xhr.addEventListener('readystatechange', function () {
                    if (xhr.readyState === 4 && xhr.status === 200) {
                        let fileName = domain + JSON.parse(xhr.responseText).key;
                        document.querySelector('.image textarea').value += '![' + imageBase64.name + '](' + fileName + ')\n\n';
                    }
                })
            })
        });
    })

}());
