let jquery1 = function(){
    return new jquery1.fn.init();
}

jquery1.fn = {
    css: function(){
    console.log("here is all the functions")}

}
let init = jquery1.fn.init = function() {
   console.log("get elements intialized")
    
}

jquery1.fn.init.prototype = jquery1.fn

let s = jquery1;
