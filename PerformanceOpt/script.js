const input1 = document.getElementById("input1");

// let timer = null;
// input1.addEventListener("keyup", function () {
// 	if (timer) {
// 		clearTimeout(timer);
// 	}

// 	timer = setTimeout(() => {
// 		console.log(this.value);
// 		timer = null;
// 	}, 500);
// });

function debounce (fn, delay = 500) {
	// 数据被隐藏
	let timer = null;
	return function () {
		if (timer) {
			clearTimeout(timer);
		}
		timer = setTimeout(() => {
			fn.apply(this, arguments);
			timer = null;
		}, delay);
	};
}

input1.addEventListener(
	"keyup",
	debounce(() => {
		console.log(input.value);
	}, 600)
);

// Throttle
// let timer = null;
const div1 = document.getElementById("div1");

// div1.addEventListener("drag", function throttle (e) {
// 	if (timer) {
// 		//只要timer有值，就返回，就节流
// 		return;
// 		// clearTimeout(timer);
// 	}
// 	timer = setTimeout(() => {
// 		console.log(e.offsetX, e.offsetY);

// 		div1.style.left = e.offsetX;
// 		div1.style.top = e.offsetY;
// 		// this.y = e.offsetY;

// 		// when it is done
// 		timer = null;
// 	}, 100);
// });
function throttle (fn, delay = 100) {
	let timer = null;
	return function () {
		if (timer) return;
		// using ()=> instead of function(){} to get the event
		timer = setTimeout(() => {
			//箭头函数没有自己的arguments和this
			console.log("this", this);
			fn.apply(this, arguments);
			timer = null;
		}, delay);
		// timer = setTimeout(function () {
		// 	//箭头函数没有自己的arguments和this
		// 	//如果定义成function 则是window
		// 	console.log("this", this);
		// 	fn.apply(this, arguments);
		// 	timer = null;
		// }, delay);
	};
}
div1.addEventListener(
	"drag",
	throttle(function (e) {
		// console.log("e", e);
		console.log(e.offsetX + " " + e.offsetY);
	})
);
