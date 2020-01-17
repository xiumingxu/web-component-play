const ball = document.querySelector('#ball');

let value = 0;
const add = () => {
	requestAnimationFrame(add);
	value += 5;
	// ball.style.transform = 'translateX(' + value + 'px)';
	ball.style.transform = `translateX(${value}px)`;
};
// requestAnimationFrame(add);

// generic

function animate (start, end, time, callback) {
	let startTime = performance.now();
	let differ = end - start;

	function loop () {
		raf = requestAnimationFrame(loop);
		const passTime = performance.now() - startTime; // 获取当前时间和开始时间差
		let per = passTime / time; // 计算当前已过百分比
		if (per >= 1) {
			// 判读如果已经执行
			per = 1; // 设置为最后的状态
			cancelAnimationFrame(raf); // 停掉动画
		}
		const pass = differ * per; // 通过已过时间百分比*开始结束数值差得出当前的数值
		callback(pass); // 调用回调函数，把数值传递进去
	}

	let raf = requestAnimationFrame(loop); // 下一阵调用每帧之前要执行的函数
}

// animate(0, 400, 1000, (value) => {
// 	ball.style.transform = `translateX(${value}px)`; // 将数值设置给 方块 的 css 属性 transform 属性可以控制元素在水平方向上的位移
// });

// with time function
function easeIn (time) {
	return time ** 2;
}

function shake (time) {
	if (time < 0.6) {
		return (time / 0.6) ** 2;
		// return easeIn(time);
	}
	else {
		return Math.sin((time - 0.6) * (3 * Math.PI / 0.4)) * 0.2 + 1;
	}
}

// with a timing animation function
function animate (start, end, time, callback, easing = (t) => t) {
	let startTime = performance.now();
	let differ = end - start;

	function loop () {
		raf = requestAnimationFrame(loop);
		const passTime = performance.now() - startTime; // 获取当前时间和开始时间差
		let per = passTime / time; // 计算当前已过百分比
		if (per >= 1) {
			// 判读如果已经执行
			per = 1; // 设置为最后的状态
			cancelAnimationFrame(raf); // 停掉动画
		}
		const pass = differ * easing(per); // 通过已过时间百分比*开始结束数值差得出当前的数值
		callback(pass); // 调用回调函数，把数值传递进去
	}

	let raf = requestAnimationFrame(loop); // 下一阵调用每帧之前要执行的函数
}

animate(
	0,
	400,
	3000,
	(value) => {
		ball.style.transform = `translateX(${value}px)`;
	},
	easeIn
);
