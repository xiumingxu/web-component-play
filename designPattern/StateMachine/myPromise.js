// let StateMachine = require('javascript-state-machine');
// var StateMachine = require('javascript-state-machine');
// 需要 webpack 换一下
// import StateMachine from './javascript-state-machine.ts';
let StateMachine = window.StateMachine;
console.log(StateMachine);

// let fsm =  new StateMachine({
//     init: "SAVE",
//     transitions: [
//         {
//             name:"doStore",
//             from
//         }
//     ]
// })

let fsm = new StateMachine({
	init        : 'pending',
	transitions : [
		{
			name : 'resolve',
			from : 'pending',
			to   : 'fullfillled'
		},
		{
			name : 'reject',
			from : 'pending',
			to   : 'rejected'
		}
	],
	methods     : {
		// name 要小些
		onResolve : function (state, data) {
			console.log('state', state);
			console.log('data', data);
			//当前状态; data=>PROMISE
			data.successList.forEach((fn) => fn());
		},
		onReject  : function (state, data) {
			data.failList.forEach((fn) => fn());
		}
	}
});
class myPromise {
	constructor (fn) {
		this.successList = [];
		this.failList = [];

		let _this = this;
		//fn 的参数在下面解析: 有个解构的过程: 函数立马执行
		fn(
			//传进来的函数  resolve
			() => {
				// 把 successlist 的函数执行
				// 这里 用箭头函数可以 ,如果用传统的函数, 则需要另外赋值
				fsm.resolve(this);
			},
			//传进来的函数  reject
			() => {
				// 吧 faillist 的函数执行
				fsm.reject(this);
			}
		);
	}

	then (successFn, failFn) {
		this.successList.push(successFn);
		this.failList.push(failFn);
	}
}

//测试代码

function loadImage (src) {
	const promise = new myPromise(function (resolve, reject) {
		let img = new Image();
		img.onload = function () {
			resolve();
		};
		img.onerror = function () {
			reject();
		};
		img.src = src;
	});
	return promise;
}

let src = 'https://pbs.twimg.com/profile_images/3572978953/8c522d3ea384cd42e46a4a2498300c35_400x400.jpeg';
let result = loadImage(src);
result.then(
	() => {
		console.log('success');
	},
	() => {
		console.log('failed');
	}
);
result.then(
	() => {
		console.log('success');
	},
	() => {
		console.log('failed');
	}
);
