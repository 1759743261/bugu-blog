
/**
 *  @BuGu: 左侧导航栏的展开、收起
 *  ----------分----------割----------线----------分----------割----------线----------分----------割----------线----------
 */
(function () {
    let btn = document.querySelector('#container #content .header .menu-active-btn');
    if (btn !== null) {
        let f1 = true;
        let w;
        btn.addEventListener('click', function () {
            let left = document.querySelector("#container #sidebar");
            if (f1) {
                left.style.width = '0';
                w = left.clientWidth;
                btn.querySelector('use').setAttribute('href', '#icon-zhankaicaidan');
            } else {
                left.style.width = w + 'px';
                btn.querySelector('use').setAttribute('href', '#icon-shouqicaidan');
            }
            f1 = !f1;
        })
    }
}());


/**
 *  @BuGu: 左侧导航栏二级菜单的展开、收起
 *  ----------分----------割----------线----------分----------割----------线----------分----------割----------线----------
 */
(function () {
    let menuBoxs = document.querySelectorAll('#container #sidebar .sidebar-box .menu .menu-item:nth-child(n+2)');
    // 2. 左侧导航栏二级菜单的展开、收起，同时动态的设置高度
    menuBoxs.forEach(menu => {
        menu.querySelector('.menu-title').addEventListener('click', function () {
            if (menu.getAttribute('is-open') === "0") {
                menu.setAttribute('is-open', '1');
            } else {
                menu.setAttribute('is-open', '0');
            }
        })
    });
}());


/**
 *  @BuGu: 点击退出登录
 *  ----------分----------割----------线----------分----------割----------线----------分----------割----------线----------
 */
(function () {
    document.querySelector('#container #content .content-box .header .header-box .logout').addEventListener('click',function () {
        buguAjax({
            method: "get",
            url: "http://localhost:8080/user/logout",
            success: function (obj) {
                if (obj.code === 200) {
                    location.href = "/Blog/page/front/index.html";
                }
            }
        })
    })
}());



