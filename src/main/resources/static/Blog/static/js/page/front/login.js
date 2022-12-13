/**
 *  @BuGu: 输入框点击变大的动画
 *  ----------分----------割----------线----------分----------割----------线----------分----------割----------线----------
 */
(function () {
    document.querySelectorAll('#content .main .box .login-register-box .item-input input').forEach(ele => {
        ele.addEventListener('focus', () => ele.setAttribute('is-focus', '1'));
        ele.addEventListener('blur', () => ele.setAttribute('is-focus', '0'));
    })
}());


/**
 *  @BuGu: 遮盖层图片动画
 *  ----------分----------割----------线----------分----------割----------线----------分----------割----------线----------
 */
(function () {
    // 图片的状态
    let isLoginState = true;
    // 登录、注册遮盖层的移动
    let changeLoginAndRegisterOfImg = document.querySelector('#content .main .box .top-img');
    // 图片的状态
    changeLoginAndRegisterOfImg.addEventListener('click', function () {
        // 点击之后，状态改变
        isLoginState = !isLoginState;
        // 判断
        if (isLoginState) {
            changeLoginAndRegisterOfImg.style.right = '0';
        } else {
            changeLoginAndRegisterOfImg.style.right = '50%';
        }
    })
}());


/**
 *  @BuGu: 表单输入信息的动态验证
 *  ----------分----------割----------线----------分----------割----------线----------分----------割----------线----------
 */
(function () {

    // 输入数据合法
    function changeToRight(svgObj) {
        svgObj.setAttribute('name', 'zhengque');
        svgObj.querySelector('use').setAttribute('href', '#icon-zhengque');
    }

    // 输入数据错误
    function changeToError(svgObj) {
        svgObj.setAttribute('name', 'cuowu');
        svgObj.querySelector('use').setAttribute('href', '#icon-cuowu');
    }

    // 输入数据等待中
    function changeToWait(svgObj) {
        svgObj.setAttribute('name', 'dengdai');
        svgObj.querySelector('use').setAttribute('href', '#icon-dengdai');
    }

    // 判断用户名是否符合规则【仅验证长度6到18】
    (function () {
        let usernameInput = document.querySelector('#content .main .box .register li input[name="username"]');
        usernameInput.addEventListener('keyup', function () {
            if (this.value.length === 0) {
                changeToWait(this.parentNode.parentNode.querySelector('svg'));
            } else {
                if (buguReg(this.value, 6, 18)['stringLen']) {
                    changeToRight(this.parentNode.parentNode.querySelector('svg'));
                } else {
                    changeToError(this.parentNode.parentNode.querySelector('svg'));
                }
            }
        })
    }());

    // 判断手机号是否符合规则【为了测试方便： || this.value === "123"】
    (function () {
        let phoneInput = document.querySelector('#content .main .box .register li input[name="phone"]');
        phoneInput.addEventListener('keyup', function () {
            if (this.value.length === 0) {
                changeToWait(this.parentNode.parentNode.querySelector('svg'));
            } else {
                if (buguReg(this.value)['phone'] || this.value === "123") {
                    changeToRight(this.parentNode.parentNode.querySelector('svg'));
                } else {
                    changeToError(this.parentNode.parentNode.querySelector('svg'));
                }
            }
        })
    }());

    // 判断QQ邮箱是否符合规则【为了测试方便： || this.value === "123"】
    (function () {
        let emailInput = document.querySelector('#content .main .box .register li input[name="QQEmail"]');
        emailInput.addEventListener('keyup', function () {
            if (this.value.length === 0) {
                changeToWait(this.parentNode.parentNode.querySelector('svg'));
            } else {
                if (buguReg(this.value)['qqEmail'] || this.value === "123") {
                    changeToRight(this.parentNode.parentNode.querySelector('svg'));
                } else {
                    changeToError(this.parentNode.parentNode.querySelector('svg'));
                }
            }
        })
    }());

    // 判断密码是否符合规则
    (function () {
        let passwordInput = document.querySelector('#content .main .box .register li input[name="password"]');
        let passwordAgainInput = document.querySelector('#content .main .box .register li input[name="password1"]');
        passwordInput.addEventListener('keyup', function () {
            if (this.value.length === 0) {
                changeToWait(this.parentNode.parentNode.querySelector('svg'));
            } else {
                if (buguReg(this.value, 6, 18)['stringLen']) {
                    changeToRight(this.parentNode.parentNode.querySelector('svg'));
                } else {
                    changeToError(this.parentNode.parentNode.querySelector('svg'));
                }
                // 如果再次输入密码里面有内容，则判断其内容
                if (passwordAgainInput.value.length > 0) {
                    if (this.value === passwordAgainInput.value && buguReg(this.value, 6, 18)['stringLen']) {
                        changeToRight(passwordAgainInput.parentNode.parentNode.querySelector('svg'));
                    } else {
                        changeToError(passwordAgainInput.parentNode.parentNode.querySelector('svg'));
                    }
                }
            }
        })
    }());

    // 判断再次输入的密码是否符合规则
    (function () {
        let passwordInput = document.querySelector('#content .main .box .register li input[name="password"]');
        let passwordAgainInput = document.querySelector('#content .main .box .register li input[name="password1"]');
        passwordAgainInput.addEventListener('keyup', function () {
            if (this.value.length === 0) {
                changeToWait(this.parentNode.parentNode.querySelector('svg'));
            } else {
                if (this.value === passwordInput.value) {
                    if (buguReg(this.value, 6, 18)['stringLen']) {
                        changeToRight(this.parentNode.parentNode.querySelector('svg'));
                    }
                } else {
                    changeToError(this.parentNode.parentNode.querySelector('svg'));
                }
            }
        })
    }());

    // 判断验证码是否符合规则
    (function () {
        let codeInput = document.querySelector('#content .main .box .register li input[name="code"]');
        codeInput.addEventListener('keyup', function () {
            if (this.value.length === 0) {
                changeToWait(this.parentNode.parentNode.querySelector('svg'));
            } else {
                // 服务器传过来的验证码
                let code = codeInput.getAttribute('code');
                if (this.value.toUpperCase() === code.toUpperCase()) {
                    changeToRight(this.parentNode.parentNode.querySelector('svg'));
                } else {
                    changeToError(this.parentNode.parentNode.querySelector('svg'));
                }
            }
        })
    }());

}());


/**
 *  @BuGu: 点击登录按钮，发送登录请求
 *  ----------分----------割----------线----------分----------割----------线----------分----------割----------线----------
 */
(function () {
    document.querySelector('#content .main .box .login form .submit').addEventListener('click', function () {
        buguAjax({
            "method": 'get',
            "param": getFormKeyAndValue(document.querySelector('#content .main .box .login form')),
            "url": '/user/login',
            "success": function (obj) {
                if (obj.code === 200) {
                    location.href = '/Blog/page/backend/index.html';
                } else if (obj.code === 400) {
                    messagePopOfWarn(obj.msg);
                }
            },
        });
    });
}());


/**
 *  @BuGu: 点击注册按钮，发送注册请求
 *  ----------分----------割----------线----------分----------割----------线----------分----------割----------线----------
 */
(function () {
    // 判断是否可以发起注册请求的方法封装
    let isToRegister = function () {
        let useElements = document.querySelectorAll('#content .main .box .register form svg use');
        for (let i = 0; i < useElements.length; i++) {
            if (useElements[i].getAttribute('href') !== '#icon-zhengque') {
                return false;
            }
        }
        return true;
    };
    // 点击注册按钮
    document.querySelector('#content .main .box .register form .submit').addEventListener('click', function () {
        let isReg = false;
        if (isReg) {
            if (isToRegister()) {
                buguAjax({
                    "method": 'post',
                    "param": getFormKeyAndValue(document.querySelector('#content .main .box .register form')),
                    "url": '/user/register',
                    "success": function (obj) {
                        if (obj.code === 200) {
                            messagePopOfSuccess(obj.msg + '，稍后自动刷新页面');
                            jumpToPage(3, location.href);
                        } else if (obj.code === 400) {
                            messagePopOfWarn(obj.msg);
                        }
                    },
                });
            } else {
                popMessage('信息填写不符合规则', 'warn');
            }
        } else {
            popMessage('注册功能暂不开放', 'warn');
        }
    });
}());


/**
 *  @BuGu: 验证码
 *  ----------分----------割----------线----------分----------割----------线----------分----------割----------线----------
 */
(function () {

    // 设请求到的验证码的信息
    function setRandomCode(data) {
        // 1. 设置信息
        let codeInput = document.querySelector('#content .main .box .register li input[name="code"]');
        codeInput.style.backgroundImage = 'url("' + 'data:image/png;base64,' + data.codeBase64 + '")';
        codeInput.setAttribute('code', data.codeNum);
        // 2. 验证码刷新完之后，需要清空内容
        codeInput.value = '';
    }

    // 请求验证码
    function getRandomCode() {
        buguAjax({
            "method": "get",
            "param": {
                "t": new Date().getTime(),
            },
            "url": "/common/code",
            "success": function (obj) {
                setRandomCode(obj.data);
            }
        })
    }

    // 加载页面请求验证码
    getRandomCode();

    // 双击刷新验证码
    (function () {
        let codeInput = document.querySelector('#content .main .box .register li input[name="code"]');
        codeInput.addEventListener('dblclick', function () {
            getRandomCode();
        })
    }());

}());

