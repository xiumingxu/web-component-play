function test () {
	let arr = [];
	//var 不行 但是 let 行
	for (var i = 0; i < 10; i++) {
		arr[i] = function () {
			console.log(i);
		};
	}
	return arr;
}

let arr = test();
for (let i = 0; i < 10; i++) {
	arr[i]();
}
