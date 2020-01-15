import ShoppingCart from './ShoppingCart/index.js';
import List from './List/index.js';

export default class App {
	constructor (id) {
		this.view = document.getElementById(id);
		this.init();
	}

	initShoppingCart () {
		this.shoppingCart = new ShoppingCart(this);
	}
	initList () {
		this.list = new List(this);
	}
	// 两种都可以 func =  ()=> , func(){}
	init () {
		this.initList();
		this.initShoppingCart();
	}
}

new App('app');
