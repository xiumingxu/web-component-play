// 单例模式 用模块化的方法去实现
// 不 export 就封闭了
class Cart {
	constructor () {
		this.list = [];
	}
	add (data) {
		this.list.push(data);
	}
	del (id) {
		this.list = this.list.filter((item) => item.id !== id);
	}
	getList () {
		console.log(this.list);
		return this.list
			.map((item) => {
				return item.name;
			})
			.join('\n');
	}
}
//单例模式 且 数据封闭
let getCart = (function () {
	let cart = undefined;
	return function () {
		if (!cart) {
			cart = new Cart();
		}
		return cart;
	};
})();

export default getCart;
