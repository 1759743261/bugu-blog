// 请求所有的文章分类
(function () {
    buguAjax({
        method: "get",
        url: "/category/getAll",
        success: function (obj) {
            obj.data.forEach(category => {
                let optionElement = document.createElement('option');
                optionElement.innerText = category.name;
                optionElement.setAttribute('value', category.name);
                optionElement.setAttribute('id', category.id);
                document.querySelector('.main-box form[class="article"] select').append(optionElement);
            })
        },
    })
}());


// 提交新增文章的请求
(function () {
    document.querySelector('.main-box form[class="article"] input[type="submit"]').addEventListener('click', function () {
        // 1. 获取参数
        let param = {};
        param.title = document.querySelector('.main-box form[class="article"] input[name="title"]').value;
        param.desc = document.querySelector('.main-box form[class="article"] textarea[name="desc"]').value;
        param.content = document.querySelector('.main-box form[class="article"] textarea[name="content"]').value;
        param.content = solvePostData(param.content);
        // 后续需要处理分类为空的情况
        let selectIndex = document.querySelector('.main-box form[class="article"] select').selectedIndex;
        let optionEle = document.querySelectorAll('.main-box form[class="article"] select option')[selectIndex];
        param.categoryId = optionEle.id;
        document.querySelectorAll('.main-box form[class="article"] input[type="radio"]').forEach(radio => {
            if (radio.checked) {
                param.isTop = radio.getAttribute('value');
            }
        })
        // 2. 发送请求
        buguAjax({
            method: "post",
            param: param,
            url: "/article/add",
            success: function (obj) {
                messagePopByCode(obj.code, obj.msg);
                document.querySelector('.main-box form[class="article"]').reset();
            },
        })
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