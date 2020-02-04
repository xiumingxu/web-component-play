// @ts-ignore
class Cache {
	constructor (resource) {
		if (resource) {
			this.url = resource.url;
			this.version = resource.version;
			this.resourceList = resource.resourceList;
			this.init();
		}
		else {
			throw new Error('need config');
		}
	}

	init () {
		this.getResources().then((data) => {
			this.render(data);
		});
	}
	render (js) {
		let body = document.querySelector('body');
		// 	for (let img of images) {
		// 	let imgDOM = new Image();
		// 	imgDOM.src = 'data:image/jpg;base64,' + img;
		// 	body.appendChild(imgDOM);
		// }

		for (let j of js) {
			let s = document.createElement('script');
			s.innerHTML = j;
			body.appendChild(s);
		}
	}

	needUpdate () {
		if (localStorage['version'] !== this.version) return true;
		else return false;
	}

	getResources (path) {
		return new Promise((resolve, reject) => {
			if (localStorage.getItem(this.url)) {
				resolve(localStorage.getItem(path));
			}
			if (localStorage[this.url] && !this.needUpdate()) {
				let resource = [];
				for (let item of this.resourceList) {
					let itemres = {};
					itemres[item] = localStorage[item];
					resource.push(itemres);
				}
				resolve(resource);
			}

			// // first fetch || //UPDATE ???
			let fetches = [];
			for (let sublist of this.resourceList) {
				let wholePath = this.url + sublist.path;
				fetches.push(this.firstFetch(wholePath));
				this.firstFetch(wholePath).then((data) => {
					try {
						localStorage.setItem(wholePath, data);
					} catch (oException) {
						console.log('exception');
					}
				});
			}
			Promise.all(fetches).then((arr) => resolve(arr));
		});
	}

	firstFetch (path) {
		let xhr = new XMLHttpRequest();
		xhr.open('GET', path);
		xhr.send();
		return new Promise((resolve, reject) => {
			xhr.onreadystatechange = (e) => {
				if (xhr.readyState === 4 && xhr.status === 200) {
					// save to the locationStorage
					resolve(xhr.responseText);
				}
			};
		});
	}
}

let config = {
	url          : 'http://127.0.0.1:5500/JSFeatures/cache/',
	version      : 2,
	resourceList : [
		{
			type : 'js',
			path : 'res/deepClone.js'
		},
		{
			type : 'js',
			path : 'res/Async.js'
		}
	]
};

// let url =
// 	'https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Google_Images_2015_logo.svg/1200px-Google_Images_2015_logo.svg.png';

// getData(url).then((res) => console.log(res));
// getData(url).then((res) => console.log(res));
let cache = new Cache(config);
