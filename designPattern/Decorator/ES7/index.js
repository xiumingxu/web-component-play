function mixins (...list) {
	return function (target) {
		Object.assign(target.prototype, ...list);
	};
}

const Foo = {
	foo () {
		alert("foo");
	}
};

@mixins(Foo)
class MyClass {}

let obj = new MyClass();
obj.foo();
