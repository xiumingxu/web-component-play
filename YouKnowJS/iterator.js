var myObject = {
    a: 2,
    b: 3
};
Object.defineProperty(myObject, Symbol.iterator, {
    enumerable: false,
    writable: false,
    configurable: true,
    value: function () {
        var o = this;
        var idx = 0;
        var ks = Object.keys(o); return {
            next: function () {
                const res = {
                    value: o[ks[idx++]],
                    done: (idx > ks.length)
                };
                console.log(res)
                return res;
            }
        };
    }
});
// 手动遍历 myObject
var it = myObject[Symbol.iterator]();
it.next(); // { value:2, done:false } 
it.next(); // { value:3, done:false } 
it.next(); // { value:undefined, done:true }
// 用 for..of 遍历 myObject
for (var v of myObject) {
    console.log(v);
}
// 2 // 3