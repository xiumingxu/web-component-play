// function test () {
// 	let arr = [];
// 	//var 不行 但是 let 行
// 	for (var i = 0; i < 10; i++) {
// 		arr[i] = function () {
// 			console.log(i);
// 		};
// 	}
// 	return arr;
// }

// let arr = test();
// for (let i = 0; i < 10; i++) {
// 	arr[i]();
// }

function foo (a, b) {
	console.log(b);
	return {
		foo : function (c) {
			return foo(c, a); //重点是执行了
		}
	};
}

var func1 = foo(0);

func1.foo(1);
func1.foo(2);
func1.foo(3);
var func2 = foo(0);
var func4 = func2.foo(1);
var func5 = func4.foo(2);
var func6 = func5.foo(3);

var func3 = foo(0).foo(1);
func3.foo(2);
func3.foo(3);

var scope = 'global scope';
function checkscope () {
	var scope = 'local scope';
	function f () {
		return scope;
	}
	return f();
}
checkscope();

// difference
var scope = 'global scope';
function checkscope () {
	var scope = 'local scope';
	function f () {
		return scope;
	}
	return f;
}
checkscope()();

// execution context
function foo () {
	console.log('foo1');
}
foo(); // foo2
function foo () {
	console.log('foo2');
}
foo(); // foo2
