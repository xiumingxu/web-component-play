if (navigator.serviceWorker) {
	// register, 作用域 为当前的 路径, 返回一个 promise
	navigator.serviceWorker
		.register('./service-worker.js', { scope: './' })
		.then(function (reg) {
			console.log(reg);
		})
		.catch(function (e) {
			console.log(e);
		});
}
else {
	alert('Service Worker is not supported');
}
