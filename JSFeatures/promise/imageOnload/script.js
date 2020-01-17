const url = "https://www.sony.com/image/bc6d25fa6371c2899ce704a2bed7614c?fmt=png-alpha&wid=960";

function loadImage (url) {
	return new Promise((resolve, reject) => {
		const img = document.createElement("img");
		// resolve and reject are functions
		// callback
		img.onload = () => {
			resolve(img);
			// return img;
		};
		img.onerror = () => {
			const err = new Error(`picture onload fail $(url)`);
			reject(err);
		};
		// execute
		img.src = url;
	});
}

// then carry
loadImage(url).then((img) => {
	console.log(img);
	document.body.appendChild(img);
});
// then could chain
