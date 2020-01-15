let isObject =(s)=>{
    return (typeof(s) === 'object' && s !== null)    
}
function isEqual (m1, m2) {
    //typeof: function, undefined, object, number, boolean, string, symbol
    // take a notice of null
	if (typeof m1 !== typeof m2) {
		return false;
	}
	if (typeof m1 !== 'object') {
		return m1 === m2;
		// array:
	}
	// array, object
	// if (Array.isArray(m1) && Array.isArray(m2)) {
	// 	if (m1.length !== m2.length) return false;
	// 	for (let i = 0; i < m1.length; i++) {
	// 		if (!isEqual(m1[i], m2[i])) return false;
	// 	}
	// 	return true;
	// }
	// onbject
	// if (!Array.isArray(m1) && !Array.isArray(m2)) {
	if (Object.keys(m1).length !== Object.keys(m2).length) return false;
    // }
    
    for(let key in 
}

//deepClone object
function deepClone (target) {
	if (target === undefined || target === null) return {};
	let result = {};
	for (let key in target) {
		if (target.hasOwnProperty(key)) {
			if (typeof target[key] !== 'object') result[key] = target[key];
			else {
				result[key] = deepClone(target[key]);
			}
		}
	}
	return result;
}
// 对象比较
// split 和 join 的区别

//数组的 a b
