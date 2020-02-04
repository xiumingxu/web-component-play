function throttle (fn, delay = 500) {
	let timer = null;
	return function () {
		if (timer) return;
		timer = setTimeout(() => {
			fn.apply(this, arguments);
			timer = null;
		}, delay);
	};
}

let throttledFn = throttle(function printed () {
	console.log(+new Date());
});

function debounce (fn, delay = 1000, rightNow = false) {
	let timer = null;
	return function () {
		if (rightNow) {
			if (!timer) {
				fn.apply(this, arguments);
				timer = setTimeout(() => {
					fn.apply(this, arguments);
					timer = null;
				}, delay);
			}
			else {
				clearTimeout(timer);
				timer = setTimeout(() => {
					fn.apply(this, arguments);
				}, delay);
			}
		}
		else {
			clearTimeout(timer);
			timer = setTimeout(() => {
				fn.apply(this, arguments);
			}, delay);
		}
	};
}

let debounceFn = debounce(function printed () {
	console.log('debouced ' + +new Date());
});

let timer = setInterval(debounceFn, 100);
setTimeout(() => {
	clearInterval(timer);
}, 1000);
