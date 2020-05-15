function throttle (fn, interval) {
    let timer;
    return function () {
        if (timer) return;
        timer = setTimeout(function () {
            timer = null;
            //??
            fn.apply(this, arguments);
        }, interval);
    };
}

function debounce (fn, delay) {
    let timer;
    return function () {
        //如果存在需要把之前的消除掉
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(function () {
            fn.apply(this, arguments);
        }, delay);
    };
}
