function deepClone (source) {
	// 仅限于{}
	if (typeof source !== 'object')
		// shallow copy
		return Object.assign({}, source);

	let target = Array.isArray(source) ? [] : {};
	for (let prop in source) {
		if (source.hasOwnProperty(prop)) {
			target[prop] = deepClone(source[prop]);
		}
	}
	return target;
}

function deepClone2 (source) {
	//     if(typeof source !== "object")
	//         // shallow copy
	//         return Object.assign({}, source);

	let target = Array.isArray(source) ? [] : {};
	for (let prop in source) {
		if (source.hasOwnProperty(prop)) {
			if (typeof source[prop] == 'object') {
				target[prop] = deepClone2(source[prop]);
			}
			else {
				target[prop] = source[prop];
			}
		}
	}
	return target;
}
var o1 = {
	arr  : [ 1, 2, 3, [ 12 ] ],
	obj  : {
		key : 'value'
	},
	func : function () {
		return 1;
	}
};

// let r = deepClone(o1);
let r = deepClone2(o1);
console.log(r);
