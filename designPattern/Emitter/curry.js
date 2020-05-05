// 4. 请使用如下sum和multi两个函数，计算如下应用题：小明每天收割 10 个苹果，小亮一共有 20 个苹果，请问 5 天以后他们一共有多少个苹果？
function sum (a, b) {
    return a + b;
}

// 返回两个数的乘积
function multi (c, d) {
    return c * d;
}

// const ming = 10;
// const liang = 20;

// res = multi(5, sum(ming, liang));
const _ = {
    compose : function (f, g) {
        return function (x) {
            return f(g(x));
        };
    },
    partial : (func, par) => {
        return null;
    }
};
// 
