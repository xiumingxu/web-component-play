import Item from './Item.js';
// 工厂模式

// 补充优惠商品的处理逻辑
export default function (list, itemData) {
	return new Item(list, itemData);
}
