let count = 20;
function addPhoto (data) {
	// let quotes = getData().then(data);
	data = data.quotes;
	console.log("data", data.quotes);

	let templateHTML = s("#poster").innerHTML;
	let array = [];
	for (let i = 0; i < count; i++) {
		let html = templateHTML.replace("{{quote}}", data[i][0]).replace(/{{index}}/g, i);
		array.push(html);
		// console.log(quotes[i][0]);
	}
	s("#poster").innerHTML = array.join("");
	// lost this
	// templateHTML = array.join("");
}
addPhoto(data);

// getData().then((data) => {
// 	addPhoto(data);
// 	centerImg(1);
// });

function turn (ele) {
	let cls = ele.className;
	// console.log(cls);
	if (/photo-front/.test(cls)) {
		cls = cls.replace(/photo-front/, "photo-back");
	}
	else {
		cls = cls.replace(/photo-back/, "photo-front");
	}
	// overwrite here
	return (ele.className = cls);
}

function random (min, max) {
	let diff = max - min;
	return Math.floor(Math.random() * diff) + min;
}
function centerImg (num) {
	// let num = random(0, 19);
	var str = "#photo_" + num;
	var photo = s(str);
	photo.removeAttribute("style");
	photo.className += " photo-center";
}

var preCenter;
let photoArray;

function scatterPhotos (centerId) {
	let poster = s("#poster");

	let photos = s(".photo");
	console.log(photos.length);
	photoArray = Array.from(photos);
	let photoConfig = {
		w : photos[0].clientWidth,
		h : photos[0].clientHeight
	};
	let posterConfig = {
		w : poster.clientWidth,
		h : poster.clientHeight
	};

	// remove previous centerID
	preCenter = photoArray.filter((p) => /photo-center/.test(p.className));
	preCenter.forEach((p) => {
		p.className = p.className.replace(/photo-center/g, "");
	});

	centerId = "photo_" + centerId;
	let leftXRange = [ 0 - photoConfig.w / 2, posterConfig.w / 2 - photoConfig.w ];
	let YRange = [ 0 - photoConfig.h / 2, posterConfig.h - photoConfig.h / 2 ];
	let rightXRange = [ posterConfig.w / 2, posterConfig.w - photoConfig.w / 2 ];

	let left = [];
	let right = [];

	photoArray = photoArray.filter((p) => p.id != centerId);
	let photosLeft = photoArray.splice(0, Math.floor(photoArray.length / 2));
	let photosRight = photoArray;

	photosLeft.forEach((p) => {
		p.style.left = random(...leftXRange) + "px";
		p.style.top = random(...YRange) + "px";
		p.style.transform = "rotateZ(" + random(-180, 180) + "deg)";
	});

	photosRight.forEach((p) => {
		p.style.left = random(...rightXRange) + "px";
		p.style.top = random(...YRange) + "px";
		p.style.transform = "rotateZ(" + random(-100, 80) + "deg)";
	});
}

function s (selector) {
	let method;
	if (selector.startsWith(".")) {
		method = "getElementsByClassName";
	}
	else {
		method = "getElementById";
	}
	return document[method](selector.substring(1));
}

document.body.onclick = () => {
	let centerImgNo = random(0, count);

	scatterPhotos(centerImgNo);
	centerImg(centerImgNo);
	return undefined;
};
