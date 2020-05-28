let arr = [ 1, 2, [ 3, [ 4 ] ], 5 ];

//一层拍平:
Array.prototype.concat([], arr);

//递归 深层,
function flat (arr) {
	let res = [];
	for (let i of arr) {
		if (Array.isArray(i)) {
			i = flat(i);
			// i = arguments.callee(i)
		}
		res = res.concat(i);
	}
	return res;
}
let res = [1, 2, 3, 4, [1, 2, 3, [1, 2, 3, [1, 2, 3]]], 5, "strinsg", { name: "弹铁蛋同学" }];
console.log(flat(res))

function flat2 (arr) {
	const isDeep = arr.some((item) => item instanceof Array);
	if (!isDeep) {
		return arr;
	}
	//拍一层
	const res = Array.prototype.concat.apply([], arr);
	// res = [].concat(arr);
	return flat2(res);
}

function deepClone (source) {
	let isDeep = false;
	for (let item in source) {
		if (typeof item === 'object' && item !== null) {
			isDeep = true;
		}
	}
	if (!isDeep) {
		// Object.assign({}, source)
		return { ...source };
	}

	let res = {};
	// for (let key of Object.keys(source)) {
	// 	res[key] = deepClone(source[key]);
	// }
	for (let key in source) {
		//保证是自己的
		if (source.hasOwnProperty(key)) {
			res[key] = deepClone(source[key]);
		}
	}

	return res;
}

let flat3 = (arr) => arr.reduce((accumulator, item)=>{
	if (Array.isArray(item)) return accumulator.concat(flat3(item));
	else return accumulator.concat(item);
},[])
console.log(flat3(res));
//静态方法 isArray
// console.log(arr.isArray());
