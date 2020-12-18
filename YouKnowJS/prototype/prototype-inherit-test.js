function isRelatedTo(o1, o2) {
    function F() { }
    F.prototype = o2;
    return o1 instanceof F;
}
var a = {};
var b = Object.create(a);
isRelatedTo(b, a); // true

console.log(a.isPrototypeOf(b)) // true