window.addEventListener('load', function () {
    // 1.获取元素
    var arrow_l = document.querySelector('.arrow-l');
    var arrow_r = document.querySelector('.arrow-r');
    var focus = document.querySelector('.focus');
    var focusWidth = focus.offsetWidth;
    // 2.鼠标经过focus 显示隐藏左右按钮
    focus.addEventListener('mouseenter', function () {
        arrow_l.style.display = 'block';
        arrow_r.style.display = 'block';
        clearInterval(timer);
        timer = null;  // 清除定时器变量
    })
    focus.addEventListener('mouseleave', function () {
        arrow_l.style.display = 'none';
        arrow_r.style.display = 'none';
        timer = setInterval(function () {
            arrow_r.click();
        }, 2000);
    })
    // 3.动态生成小圆圈 有几张图片就有几个小圆圈
    var ul = focus.querySelector('ul');
    var ol = focus.querySelector('.circle');
    for (var i = 0; i < ul.children.length; i++) {
        // 创建一个li
        var li = document.createElement('li');
        // 创建li的同时记录他的索引号
        li.setAttribute('index', i);
        // 把li插入到ol里面
        ol.appendChild(li);
        // 4.小圆圈的排他思想 我们可以在生成小圆圈的同时直接绑定点击事件
        li.addEventListener('click', function () {
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            this.className = 'current';
            // 点击小圆圈切换相对应的图片          
            var index = this.getAttribute('index');
            // 点击小圆圈之后把索引号给num
            num = index;
            // 点击小圆圈之后把索引号给circle
            circle = index;
            animate(ul, -index * focusWidth)
        })
    }
    // 把ol里面的第一个li设置类名为 current
    ol.children[0].className = 'current';
    // 5.轮播图的无缝滚动  
    var first = ul.children[0].cloneNode(true);  // 克隆第一张图片 然后放到最后一张
    ul.appendChild(first);
    var num = 0;
    var circle = 0;
    // 6.点击右侧按钮 滚动一张图片
    var flag = true;
    arrow_r.addEventListener('click', function () {
        if (flag) {
            flag = false;  // 关闭节流阀
            if (num == ul.children.length - 1) {
                ul.style.left = 0;
                num = 0;
            }
            num++
            animate(ul, -num * focusWidth, function () {
                flag = true; //打开节流阀
            });
            // 点击右侧按钮 小圆圈跟着图片一起走 可以声明一个变量控制小圆圈的播放
            circle++
            if (circle == ol.children.length) {
                circle = 0
            }
            circleChange();
        }
    })
    // 7.点击左侧按钮 滚动一张图片
    arrow_l.addEventListener('click', function () {
        if (flag) {
            flag = false; // 关闭节流阀
            if (num == 0) {
                num = ul.children.length - 1;
                ul.style.left = -(num * focus.offsetWidth) + 'px';
            }
            num--
            animate(ul, -num * focusWidth, function () {
                flag = true; //打开节流阀
            });
            // 点击左侧按钮 小圆圈跟着图片一起走 可以声明一个变量控制小圆圈的播放
            circle--
            if (circle < 0) {
                circle = ol.children.length - 1;
            }
            circleChange();
        }
    })
    // 封装的小圆圈改变样式的函数
    function circleChange() {
        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        }
        ol.children[circle].className = 'current';
    }
    // 8.自动播放轮播图
    var timer = setInterval(function () {
        arrow_r.click();
    }, 2000)
})