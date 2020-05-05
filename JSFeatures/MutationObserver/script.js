const id1 = document.getElementById('1');
const id2 = document.getElementById('2');
id1.addEventListener('click', function () {
    id1.setAttribute('name', '222');
    console.log('1');
});
//function 里的是同步的马上就执行了, 我也没
id2.addEventListener('click', function () {
    console.log('2');
    id2.setAttribute('name', '222');
});
new MutationObserver(function () {
    console.log('11');
}).observe(id2, {
    //马上就被触发了
    attributes : true
});
new MutationObserver(function () {
    console.log('22');
}).observe(id1, {
    //内层的也没出发了
    attributes : true
});

// id2.click(); // 2, 1,11,22
