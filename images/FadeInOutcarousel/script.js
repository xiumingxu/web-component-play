var div = document.getElementsByClassName("fade-carousel")[0];
console.log("div", div);

var controls = document.createElement("div");
controls.classList.add("controls");

var images = [
	"https://i.pinimg.com/564x/7f/c8/34/7fc834bffcd8829dc2954ae4fe777588.jpg",
	"https://i.pinimg.com/564x/ac/fb/4d/acfb4d583aa47273cdcaefe3d9ed93f1.jpg",
	"https://i.pinimg.com/564x/7d/e5/f9/7de5f99adfc5c709b5bc6d9f2c01e7af.jpg",
	"https://i.pinimg.com/564x/bb/16/48/bb16483bf5bcffdb41e010df27253939.jpg",
	"https://i.pinimg.com/474x/d3/37/d4/d337d4d526f2d7ef16dca7c8281f1df6.jpg"
];
var carousel = document.createElement("ul");
carousel.classList.add("carousel");

// initialization
let curIndex = images.length - 1;
images.forEach((imageURL, index) => {
	const li = createImage(imageURL);
	if (index === curIndex) li.classList.add("p1");
	else li.classList.add("p0");
	carousel.appendChild(li);
	const knob = createDIV("knob");
	knob.setAttribute("data-index", index);
	knob.addEventListener("click", knobClicked);
	if (index === curIndex) knob.classList.add("clicked");
	controls.appendChild(knob);
});

div.appendChild(carousel);
div.appendChild(controls);

// Effects
function knobClicked (e) {
	let el = e.target;
	var index = el.getAttribute("data-index");

	for (const knob of div.getElementsByClassName("knob")) {
		knob.className = "knob";
	}
	el.className = "knob clicked";

	let i = 0;
	for (const li of div.getElementsByTagName("li")) {
		console.log("li", li);
		if (i == index) li.className = "p1";
		else li.className = "p0";
		i++;
	}
}
// automatic rotate
let timer = null;
let rotateImage = function () {
	timer = setInterval(() => {
		curIndex++;
		curIndex = curIndex % images.length;
		Array.from(div.getElementsByClassName("knob")).forEach((knob, index) => {
			if (index === curIndex) knob.classList.add("clicked");
			else knob.classList.remove("clicked");
		});
		Array.from(div.getElementsByTagName("li")).forEach((li, index) => {
			if (index === curIndex) li.className = "p1";
			else li.className = "p0";
		});
	}, 1500);
};
rotateImage();

div.addEventListener("mouseover", () => {
	clearInterval(timer);
});
div.addEventListener("mouseout", () => {
	rotateImage();
});

function createImage (url) {
	var element = document.createElement("li");
	var img = document.createElement("img");
	img.setAttribute("src", url);
	element.appendChild(img);
	return element;
}
function createDIV (className) {
	var element = document.createElement("div");
	element.classList.add(className);
	return element;
}
