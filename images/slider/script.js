const images = [
	"https://i.pinimg.com/564x/1f/c6/69/1fc66962352f4f2cdef41af009215cc4.jpg",
	"https://i.pinimg.com/564x/60/5d/81/605d81b6de3b6c17b4f3041576e42b5b.jpg",
	"https://i.pinimg.com/474x/3b/8c/d5/3b8cd516ce6f3086a42ddcdbd4c23b5c.jpg",
	"https://i.pinimg.com/474x/ac/83/70/ac837033ef551da0506e15f651481845.jpg",
	"https://i.pinimg.com/564x/02/48/dc/0248dc77f8d960dbf2d3b172262ad740.jpg",
	"https://i.pinimg.com/474x/cb/90/22/cb902212798f776dd5b4d70ba923f30e.jpg",
	"https://i.pinimg.com/564x/38/eb/46/38eb464afe949d4454b287a2793336b2.jpg"
];

// const arrP = images.map((_, index) => "p" + index);
// console.log("arrP", arrP);

images.map((url, index) => {
	const img = document.getElementsByClassName("p" + (index + 1))[0].getElementsByTagName("img")[0];
	console.log("img", img);
	img.setAttribute("src", url);
	return index;
});

const cArr = [ "p1", "p2", "p3", "p4", "p5", "p6", "p7" ];

// const controls = document.getElementById("control-index");
// for (let i = 0; i < images.length; i++) {
// 	const c = document.createElement("div");
// 	c.classList.add("control");
// 	controls.appendChild(c);
// }

const next = document.getElementsByClassName("handle-right")[0];
const prev = document.getElementsByClassName("handle-left")[0];
let index = 0;

prev.addEventListener("click", slidePrev);

function slidePrev () {}
next.addEventListener("click", slideNext);

function slidePrev () {
	cArr.unshift(cArr[cArr.length - 1]);
	cArr.pop();
	[ ...document.getElementsByTagName("li") ].forEach((e, id) => {
		e.className = cArr[id];
	});
	index--;
	if (index < 0) {
		index = 6;
	}
}
function slideNext () {
	cArr.push(cArr[0]);
	cArr.shift();
	[ ...document.getElementsByTagName("li") ].forEach((e, id) => {
		e.className = cArr[id];
	});
	index++;
	if (index > 6) {
		index = 0;
	}
}
