document.addEventListener("DOMContentLoad", move);

function move () {}

const div1 = document.getElementById("div1");
let movement = new move();

div1.addEventListener("mouseover", () => movement(0));
div1.addEventListener("mouseout", () => movement(-180));

function move () {
	let timer = null;
	return function startmove (target) {
		// let target = arguments[0];
		// if (timer === null)
		clearInterval(timer);
		timer = setInterval(() => {
			let speed = 20;
			if (target < 0) speed = -speed;

			if (div1.offsetLeft == target) {
				clearInterval(timer);
			}
			else {
				let next = div1.offsetLeft + speed;
				if ((target >= 0 && next >= target) || (target < 0 && next <= target)) next = target;
				div1.style.left = next + "px";
				// console.log("next", next);
			}
		}, 50);
	};
}
let timer = null;

function startmove (target) {
	// if (timer === null)
	clearInterval(timer);
	timer = setInterval(() => {
		let speed = 20;
		if (target < 0) speed = -speed;

		if (div1.offsetLeft === target) {
			clearInterval(timer);
		}
		else {
			let next = div1.offsetLeft + speed;
			if ((target >= 0 && next >= target) || (target < 0 && next <= target)) next = target;
			div1.style.left = next + "px";
			// console.log("next", next);
		}
	}, 50);
}
