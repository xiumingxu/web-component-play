setTimeout((_) => console.log(4));

let n = new Promise((resolve) => {
	resolve();
	console.log(1);
}).then((_) => {
	console.log(3);
});

console.log(2);
n.then(() => {
	console.log('33');
});
