function animate(obj, target, callBack) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        var step = (target - obj.offsetLeft) / 10;  //每次移动的距离 是一个变化的量 为了实现缓动动画
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        if (obj.offsetLeft == target) {
            clearInterval(obj.timer);
            /*  if (callBack) {
                 callBack();
             } */
            callBack && callBack();
        } else {
            obj.style.left = obj.offsetLeft + step + 'px';
        }
    }, 15)
}