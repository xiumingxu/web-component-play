class Singleton {
	login () {
		console.log("this", this);
	}
}

Singleton.getInstance = (function () {
	console.log("getisntance this", this);
	let instance;
	return function () {
		if (!instance) instance = new Singleton();
		return instance;
	};
})();

let s1 = Singleton.getInstance();
s1.login();
let s2 = Singleton.getInstance();
s2.login();

console.log("s1 === s2", s1 === s2);

// ---- diff -----
let s3 = new Singleton();
s3.login();

console.log("s1 === s3", s1 === s3);
