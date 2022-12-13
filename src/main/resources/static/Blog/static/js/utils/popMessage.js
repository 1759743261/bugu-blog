/**
 *  @BuGu: 弹窗提示信息
 *  ----------分----------割----------线----------分----------割----------线----------分----------割----------线----------
 */
function popMessage(text, color) {
    let colorDict = {
        success: '#6ccc38',
        fail: '#e76072',
        warn: '#dfa23e',
    }

    function toTop(obj) {
        let times = 0;
        obj.timer = setInterval(() => {
            times++;
            if (times >= 120) {
                clearInterval(obj.timer);
                obj.remove();
            }
            if (times <= 20) {
                // 每次移动的距离
                obj.style.transform = 'translateX(-50%) translateY(-' + (times * 1) + 'px)';
            } else {
                // 每次移动的距离
                obj.style.transform = 'translateX(-50%) translateY(-' + (times * 1) + 'px)';
                // 可见度
                obj.style.opacity = (1 - (times - 20) / 100);
            }
        }, 20);
    };

    let div = document.createElement('div');
    div.innerText = text;
    div.style.cssText = '' +
        'position: fixed;left: 50%;' +
        'top: 35%;' +
        'transform: translateX(-50%);' +
        'z-index: 999;' +
        'min-width: 100px;' +
        'height: 34px;' +
        'padding: 0 15px;' +
        'background-color: ' + colorDict[color] + ';' +
        'line-height: 34px;' +
        'text-align: center;' +
        'border-radius: 2px';
    document.querySelector('body').append(div);
    toTop(div);

}

function messagePopOfSuccess(msg) {
    popMessage(msg, 'success');
}

function messagePopOfWarn(msg) {
    popMessage(msg, 'warn');
}

function messagePopByCode(code, msg) {
    if (code === 200) {
        popMessage(msg, 'success');
    } else {
        popMessage(msg, 'warn');
    }
}


