var Publisher = (function () {
	var sublist = {};
	return {
		subscribe   : function (type, subscriber) {
			if (sublist[type] === undefined) sublist[type] = [];

			if (sublist[type].some((item) => item.id === subscriber.id)) return;
			sublist[type].push(subscriber);
		},
		unsubscribe : function (type, cb) {
			let sublistIds = sublist[type].map((i) => i.id);
			// console.log('sublistIds', sublistIds.includes(cb.id));
			if (!sublist[type] || !sublistIds.includes(cb.id)) return;
			let index = sublist[type].map((i) => i.id).indexOf(cb.id);
			// console.log('index', index);
			sublist[type].splice(index, 1);
		},
		notify      : function (type) {
			sublist[type].forEach((cb) => cb.update());
		}
	};
})();


// let cb1 = {
// 	id     : 1,
// 	update : function () {
// 		console.log('运动鞋', 1);
// 	}
// };
// let cb2 = {
// 	id     : 2,
// 	update : function () {
// 		console.log('运动鞋', 2);
// 	}
// };
// let cb3 = {
// 	id     : 3,
// 	update : function () {
// 		console.log('运动鞋', 3);
// 	}
// };

// Publisher.subscribe('运动鞋', cb1);
// Publisher.subscribe('运动鞋', cb2);
// Publisher.subscribe('运动鞋', cb3);

// Publisher.notify('运动鞋');
// Publisher.unsubscribe('运动鞋', cb1);

// Publisher.notify('运动鞋');
class Pub {
	constructor () {
		this.sublist = {};
	}
	subscribe () {}
}
