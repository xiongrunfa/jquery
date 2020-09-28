$(function () {
    // 电梯导航的显示隐藏
    var flag = true;
    var toolTop = $(".recommend").offset().top;
    toggle();
    function toggle() {
        if ($(document).scrollTop() >= toolTop) {
            $(".fixedtool").fadeIn()
        } else {
            $(".fixedtool").fadeOut()
        }
    }
    $(window).scroll(function () {
        toggle();
        // 屏幕滚动到相应位置  对应的导航标签会变成红色
        if (flag) {
            $(".floor .w").each(function (i, n) {
                if ($(document).scrollTop() >= $(n).offset().top) {
                    $(".fixedtool li").eq(i).addClass("current").siblings().removeClass("current");
                }
            })
        }
    })
    // 点击导航标签 跳转模块
    $(".fixedtool li").click(function () {
        // console.log($(this).index());
        flag = false;
        $(this).addClass("current").siblings().removeClass();
        var current = $(".floor .w").eq($(this).index()).offset().top;
        $("body,html").stop().animate({
            scrollTop: current
        }, function () {
            flag = true;
        });
    })
})
