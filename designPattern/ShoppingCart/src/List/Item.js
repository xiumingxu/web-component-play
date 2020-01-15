import getCart from '../Cart/index.js';
export default class Item {
	constructor (list, content) {
		this.parent = list;
		this.content = content;
		this.view = null;
		this.btn = null;
		this.cart = getCart();

		this.init();
	}
	render () {
		this.parent.view.appendChild(this.view);
	}

	getItemView () {
		return this.view;
	}

	initContent () {
		this.view = document.createElement('div');
		console.log(this.content);
		let { name, price } = this.content;

		let nameP = document.createElement('p');
		nameP.innerHTML = name;
		let priceP = document.createElement('p');
		priceP.innerHTML = 'PRICE:' + price;

		this.view.appendChild(nameP);
		this.view.appendChild(priceP);
	}
	initBtn () {
		// 状态模式
		let btn = document.createElement('button');
		btn.innerHTML = 'Add shoppingCart';
		this.view.appendChild(btn);

		// this
	}

	init () {
		this.initContent();
		this.initBtn();
		this.render();
	}
}
