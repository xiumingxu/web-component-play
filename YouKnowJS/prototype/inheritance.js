
var anotherObject = {
    a: 2
};
var myObject = Object.create(anotherObject);
myObject.a; // 2

const no = myObject.hasOwnProperty('a')
console.log(no)

