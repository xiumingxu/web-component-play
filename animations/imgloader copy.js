'use strict';
/**
 * 图片预加载的模块 异步图片加载的模块
 * @param {*} images 图片的数组
 * @param {*} callback 加载完成的时候执行 callback 函数
 * @param {*} timeout 加载超时的时长超
 */
function loadImage (images, callback, timeout) {
	//加载完成的图片的计时器
	let count = 0;
	//全部对象加载完成的一个标志
	let success = false;
	let timeoutId = 0;
	let isTimeout = false;

	for (let key in images) {
		//对 prototype 上的属性进行过滤
		//The hasOwnProperty() method returns a boolean indicating whether the object has the specified property as its own property (as opposed to inheriting it).

		if (!images.hasOwnProperty(key)) return;
		//获得每个元素的元素
		//期望格式是 Object: {src: xxx}
		let item = images[key];

		if (typeof item === 'string') {
			item = images[key] = {
				src : item
			};
		}
		//如果格式不满足期望,则跳过
		if (!item || !item.src) {
			continue;
		}

		count++;
		//对即将加载的图片进行拓展: 设置图片元素的 id
		item.id = '__img__' + key + getID();
		//设置 图片元素的 image
		item.img = window[item.id] = new Image();
		doLoad(item);
	}
	//遍历完成 如果计数为 0, 这直接调用 callback
	if (!count) {
		callback(success);
	}
	else if (timeout) {
		//如果 timeout 时长被定义
		timeoutId = setTimeout(onTimeout, timeout);
	}
	/**
     * 在 done之后 正常加载的话 不应该出发 timeout
     * 
     */

	function onTimeout () {
		isTimeout = true;
		callback(success);
	}

	/**
     * 真正加载的函数: 做了哪些实行
     * @param {object} item new Image 是一个 html 元素
     */
	function doLoad (item) {
		//在加载的时候: OOP的编程思想: 外部要知道它此时的状态
		item.status = 'loading';

		let img = item.img;
		//开始加载图片: 真正的 https http 请求去加载图片
		img.src = item.src;

		//定义加载图片成功的回调方法
		img.onload = function () {
			success = success && true;
			item.status = 'loaded';
			done();
		};
		//定义加载图片失败的回调方法: 只要又一次图片加载失败 success 都成为 false

		img.onerror = function () {
			success = false;
			item.status = 'error';
			done();
		};

		/**
             * //不管图片调用失败还是成功都要调用一个方法
             */
		function done () {
			//清理这个对象
			img.onload = img.onerror = null;

			try {
				delete window[item.id];
			} catch (e) {}
			//没涨图片计数器加载完成,
			// 当所有的图片加载完成且没有超时的时候
			// 采取做 callback
			count--;
			//当 count 被减为 0的时候
			if (!count && !isTimeout) {
				// 传给这个一大堆的图片是否成功
				callback(success);
				clearTimeout(timeoutId);
			}
		}
	}
	/**
         * 超市函数
         */
	function onTimout () {
		isTimeout = true;
		callback(success);
	}
}

//闭包环境: 是模块化的方法
//会被一个 defined 元素作为 factory 的元素封装
let __id = 0;
function getID () {
	return ++__id;
}

module.exports = loadImage;
