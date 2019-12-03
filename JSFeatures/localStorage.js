async function getData (url) {
	if (navigator.online === false) {
		if (localStorage[url] === undefined) {
			throw new Error('no data');
			return null;
		}
		else return localStorage[url];
	}
	else {
		let response = await fetch(url);
		let json = await response.text();
		//         console.log(response);

		return new Promise((resolve, reject) => {
			if (response.status === 200) {
				let data = JSON.stringify(json);
				resolve(data);
				console.log(data);
				localStorage.setItem(url, data);
			}
			else {
				reject();
			}
		});
	}
}
let url =
	'https://stackoverflow.com/questions/55377064/javascript-localstorage-only-one-value-gets-stored-how-can-i-store-everything';
let data;
getData(url)
	.then((d) => {
		data = d;
		console.log('data', data);
	})
	.catch(() => {
		console.log('bad');
	});
// console.log(getData(""));
