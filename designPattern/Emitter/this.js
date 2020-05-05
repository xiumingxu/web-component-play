// let a = {
//     name : 'A',
//     fn   : function () {
//         // console.log(this);
//         console.log(this.name);
//     }
// };

// 一样的
// var a = {
//     name : 'A',
//     fn   : function () {
//         // console.log(this);
//         console.log(this.name);
//     }
// };
let name = 'B';
let a = {
    name : 'A',
    fn   : () => {
        // this 是{} 不知道啊是啥
        console.log(this);
        console.log(this.name);
    }
};
let f = a.fn;
f();
// a.fn();
