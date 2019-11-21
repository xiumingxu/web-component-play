var pinWheelURL =
	"https://library.kissclipart.com/20180914/zqe/kissclipart-pinwheel-icon-clipart-computer-icons-pinwheel-clip-f12f01d99013e2cf.jpg";
const iconsURL = [
	"https://i.pinimg.com/564x/ca/37/30/ca3730d50729c9db3d8a51cbb3f05333.jpg",
	"https://i.pinimg.com/564x/26/3d/73/263d73b0eb775f2cbd3e585083facbf4.jpg",
	"https://i.pinimg.com/564x/12/5a/0c/125a0c4e218b278c46cdc6163264cf6c.jpg",
	"https://i.pinimg.com/564x/87/a0/c2/87a0c29022fe510152af0a80e717a7d0.jpg",
	"https://i.pinimg.com/564x/69/f4/b6/69f4b6446b144893111264188acebffd.jpg",
	"https://i.pinimg.com/564x/69/f4/b6/69f4b6446b144893111264188acebffd.jpg"
];

var mainIcon = document.getElementById("pin-wheel");
mainIcon.src = pinWheelURL;

let subIcons = Array.from(document.querySelector("#sub-icons").getElementsByTagName("img"));
for (let i = 0; i < subIcons.length; i++) {
	subIcons[i].src = iconsURL[i];
}

let toggleHanlder = ToggleMenu();
mainIcon.addEventListener("click", toggleHanlder);

function ToggleMenu () {
	var open = false;

	return function () {
		if (open) {
			closeMenu();
			open = false;
		}
		else {
			openMenu();
			open = true;
		}
	};

	function closeMenu () {
		// for (let i = 0; i < subIcons.length; i++) {
		// 	subIcons[i].style.top = 0;
		// 	subIcons[i].style.left = 0;
		// }
		for (let i = 0; i < subIcons.length; i++) {
			console.log(subIcons[i]);
			subIcons[i].style.top = "0px";
			subIcons[i].style.left = "0px";
			subIcons[i].style.transform = "rotate(360deg)";
		}
		mainIcon.style.transform = "rotate(360deg)";
	}
	function openMenu () {
		const radius = 300;
		for (let i = 0; i < subIcons.length; i++) {
			subIcons[i].style.top = -radius / 5 * i + "px";
			subIcons[i].style.left = -radius / 5 * (5 - i) + "px";
			subIcons[i].style.transform = "rotate(-360deg)";
		}
		mainIcon.style.transform = "rotate(-360deg)";
	}
}
