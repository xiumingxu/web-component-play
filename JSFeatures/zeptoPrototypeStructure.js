let zepto = {};
// function Z(){
//     console.log("here is intilize")
// }
zepto.init = function(){
    return new z.fn.constructor();
}
let z = zepto.init;
z.fn = {
    constructor: function(){
        console.log("here is c2");
    },
    css:function(){
        console.log("css function");
    }
}
let con = z.fn.constructor;
con.prototype = z.fn

