// 初始化分类：获取所有的分类
(function initCategory() {
    buguAjax({
        method: "get",
        url: '/category/getAll',
        success: function (obj) {
            // 使用数据
            setCategory(obj.data);
        }
    });
}());

// 创建新节点的方法
function getNewCategoryNode() {
    let tr = document.createElement('tr');
    tr.innerHTML = ''
        + '<td class="category-id"></td>'
        + '<td class="category-name"></td>'
        + '<td class="category-create-time"></td>'
        + '<td class="category-update-time"></td>'
        + '<td class="action">'
        + '    <span class="delete"><a href="#">删除</a></span>'
        + '    <span class="update"><a href="#">编辑</a></span>'
        + '</td>';
    return tr;
}

// 设置数据的方法
function setCategory(categories) {
    // 1. 清空节点 main-box
    document.querySelector('.main-box .bottom .bottom-box tbody').innerHTML = '';
    // 2. 设置数据
    categories.forEach(category => {
        let categoryEle = getNewCategoryNode();
        categoryEle.querySelector('.category-id').innerText = category.id;
        categoryEle.querySelector('.category-name').innerText = category.name;
        categoryEle.querySelector('.category-create-time').innerText = localDateTimeToString(category.createTime);
        categoryEle.querySelector('.category-update-time').innerText = localDateTimeToString(category.updateTime);
        document.querySelector('.main-box .bottom .bottom-box tbody').append(categoryEle);
    })
    // 3. 为数据添加相关的事件
    setEvent();
}

// 点击按钮进行条件查询的方法
function sendRequestToGetCategory() {
    document.querySelector('.main-box .top form .search').addEventListener('click', function () {
        buguAjax({
            method: "post",
            param: getFormKeyAndValue(document.querySelector('.main-box .top form')),
            url: "/category/getListByCondition",
            success: function (obj) {
                // 1. 打印提示信息
                messagePopByCode(obj.code, obj.msg);
                // 2. 使用数据
                setCategory(obj.data);
            }
        })
    })
}

// 删除分类的方法
function deleteCategory() {
    document.querySelectorAll('.main-box .bottom .bottom-box tbody tr').forEach(categoryButtonBox => {
        categoryButtonBox.querySelector('.action .delete a').addEventListener('click', function () {
            if (confirm("是否确定删除分类：" + categoryButtonBox.querySelector('.category-name').innerText)) {
                buguAjax({
                    method: "get",
                    param: {
                        id: categoryButtonBox.querySelector('.category-id').innerText
                    },
                    url: '/category/delete',
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

// 增加
buguPopForm({
    openBtn: document.querySelector('.main-box .top .top-box form div[type="submit"] .add'),
    title: '增加分类',
    inputData: [{
        labelText: '分类名称',
        inputName: 'name',
        inputPlaceholder: '请输入分类名称',
    }],
    yesFn: function () {
        buguAjax({
            "method": 'post',
            "param": getFormKeyAndValue(document.querySelector('#pop-123456 form')),
            "url": '/category/add',
            "success": function (obj) {
                if (obj.code === 200) {
                    messagePopOfSuccess(obj.msg);
                } else if (obj.code === 400) {
                    messagePopOfWarn(obj.msg);
                }
                document.querySelector('#pop-123456').remove();
            },
        });
    },
    noFn: function () {
        document.querySelector('#pop-123456').remove();
    },
});

// 编辑
function updateCategory() {
    document.querySelectorAll('.main-box .bottom .bottom-box table tbody tr td[class="action"] .update a').forEach(editorBtn => {
        buguPopForm({
            openBtn: editorBtn,
            title: '修改分类',
            inputData: [{
                labelText: '编号',
                inputName: 'id',
                inputValue: editorBtn.parentNode.parentNode.parentNode.querySelector('.category-id').innerText,
            }, {
                labelText: '分类名称',
                inputName: 'name',
                inputValue: editorBtn.parentNode.parentNode.parentNode.querySelector('.category-name').innerText,
            }],
            yesFn: function () {
                buguAjax({
                    "method": 'get',
                    "param": getFormKeyAndValue(document.querySelector('#pop-123456 form')),
                    "url": '/category/update',
                    "success": function (obj) {
                        messagePopByCode(obj.code, obj.msg);
                        document.querySelector('#pop-123456').remove();
                        obj.code === 200 && location.reload();
                    },
                });
            },
            noFn: function () {
                messagePopOfSuccess('取消修改成功');
                document.querySelector('#pop-123456').remove();
            },
        });
    })
}

// 相关事件的汇总
function setEvent() {
    // 1. 条件查询
    sendRequestToGetCategory();
    // 2. 删除
    deleteCategory();
    // 3. 编辑
    updateCategory();
}