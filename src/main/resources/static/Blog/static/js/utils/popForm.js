function buguPopForm({openBtn, title, inputData, yesFn, noFn}) {

    function setCss() {
        document.querySelectorAll('#pop-123456 .pop-bg').forEach(ele => {
            ele.style.cssText = ''
                + 'width: 100%;'
                + 'height: 100%;'
                + 'position: fixed;'
                + 'top: 0;'
                + 'left: 0;'
                + 'background: rgb(0 0 0 / 30%);'
        });
        document.querySelectorAll('#pop-123456 .pop').forEach(ele => {
            ele.style.cssText = ''
                + 'width: 520px;'
                + 'height: auto;'
                + 'position: fixed;'
                + 'left: 50%;'
                + 'top: 80px;'
                + 'transform: translateX(-50%);'
                + 'box-shadow: 0px 0px 20px #ddd;'
                + 'z-index: 999;'
                + 'background: #ffffff;';
        });
        document.querySelectorAll('#pop-123456 .pop-title').forEach(ele => {
            ele.style.cssText = ''
                + 'width: 100%;'
                + 'height: 50px;'
                + 'text-align: center;'
                + 'cursor: move;'
        });
        document.querySelectorAll('#pop-123456 .pop-title span').forEach(ele => {
            ele.style.cssText = ''
                + 'line-height: 50px;'
                + 'font-size: 24px;'
        });
        document.querySelectorAll('#pop-123456 .pop-content').forEach(ele => {
            ele.style.cssText = ''
                + 'width: 100%;'
                + 'height: auto;'
        });
        document.querySelectorAll('#pop-123456 .pop-content .pop-input').forEach(ele => {
            ele.style.cssText = ''
                + 'width: 100%;'
                + 'height: 40px;'
                + 'text-align: center;'
                + 'margin-top: 15px;'
        });
        document.querySelectorAll('#pop-123456 .pop-content .pop-input label').forEach(ele => {
            ele.style.cssText = ''
                + 'display: inline-block;'
                + 'width: 80px;'
                + 'height: 40px;'
                + 'text-align: right;'
                + 'line-height: 40px;'
                + 'font-size: 14px;'
        });
        document.querySelectorAll('#pop-123456 .pop-content .pop-input input').forEach(ele => {
            ele.style.cssText = ''
                + 'width: 300px;'
                + 'height: 40px;'
                + 'line-height: 40px;'
                + 'border: 1px solid #ededed;'
                + 'padding-left: 10px;'
        });
        document.querySelectorAll('#pop-123456 .pop-button').forEach(ele => {
            ele.style.cssText = ''
                + 'position: relative;'
                + 'width: 100%;'
                + 'height: 80px;'
        });
        document.querySelectorAll('#pop-123456 .pop-button span').forEach(ele => {
            ele.style.cssText = ''
                + 'width: 100px;'
                + 'height: 35px;'
                + 'line-height: 35px;'
                + 'font-size: 14px;'
                + 'text-align: center;'
                + 'cursor: pointer;'
                + 'border: #ebebeb 1px solid;'
                + 'position: absolute;'
                + 'top: 25px;'
        });
        document.querySelectorAll('#pop-123456 .pop-button span[class="pop-button-yes"]').forEach(ele => {
            ele.style.left = '100px';
        });
        document.querySelectorAll('#pop-123456 .pop-button span[class="pop-button-no"]').forEach(ele => {
            ele.style.right = '100px';
        });
    };

    function getInputElement() {
        let inputList = [];
        inputData.forEach(input => {
            if(input.inputName === 'id') {
                inputList.push(''
                    + '<div class="pop-input">'
                    + '    <label>' + input.labelText + '：</label>'
                    + '    <input disabled type="text" name="' + input.inputName + '" value="' + input.inputValue + '">'
                    + '</div>');
            } else {
                if (input.inputValue !== undefined) {
                    inputList.push(''
                        + '<div class="pop-input">'
                        + '    <label>' + input.labelText + '：</label>'
                        + '    <input type="text" name="' + input.inputName + '" value="' + input.inputValue + '">'
                        + '</div>');
                } else {
                    inputList.push(''
                        + '<div class="pop-input">'
                        + '    <label>' + input.labelText + '：</label>'
                        + '    <input type="text" name="' + input.inputName + '" placeholder="' + input.inputPlaceholder + '">'
                        + '</div>');
                }
            }
        });
        return ''
            + '<div class="pop-bg"></div>'
            + '<form>'
            + '    <div class="pop">'
            + '        <div class="pop-title">'
            + '            <span>' + title + '</span>'
            + '        </div>'
            + '        <div class="pop-content">'
            + '        ' + inputList.join("")
            + '        </div>'
            + '        <div class="pop-button">'
            + '            <span href="#" class="pop-button-yes">保存</span>'
            + '            <span href="#" class="pop-button-no">取消</span>'
            + '        </div>'
            + '    </div>'
            + '</form>'
    };

    openBtn.addEventListener('click', function () {
        // 1. 创建
        let popBox = document.createElement('div');
        popBox.setAttribute('id', 'pop-123456');
        popBox.innerHTML = getInputElement();
        document.body.append(popBox);
        // 2. 设置 CSS 样式
        setCss();
        // 3. 拖拽事件【本质：先移动距离，再减去距离】
        document.querySelector('#pop-123456 .pop-title').addEventListener('mousedown', function (ele) {
            function move(ele) {
                document.querySelector('#pop-123456 .pop').style.left = ele.pageX - x + 'px';
                document.querySelector('#pop-123456 .pop').style.top = ele.pageY - y + 'px';
            }

            // (1) 获取鼠标在元素里面的相对位置
            let x = ele.pageX - document.querySelector('#pop-123456 .pop').offsetLeft;
            let y = ele.pageY - document.querySelector('#pop-123456 .pop').offsetTop;
            // (2) 移动事件
            document.addEventListener('mousemove', move);
            // (3) 弹起事件
            document.addEventListener('mouseup', function () {
                document.removeEventListener('mousemove', move);
            });
        });
        // 4. 返回事件
        document.querySelector('.pop-button-yes').addEventListener('click', () => {
            yesFn && yesFn()
        });
        document.querySelector('.pop-button-no').addEventListener('click', () => {
            noFn && noFn();
        });

    });
}