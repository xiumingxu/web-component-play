'use strict';

const STATE_INITIAL = 0;
const STATE_START = 1;
const STATE_STOP = 2;

// 定义任务的类型
let TASK_SYNC = 0;
let TASK_ASYNC = 1;

//不需要加 js
let loadImage = require('./imgloader');
let Timeline = require('./timeline').default;

function Anim () {
	this.taskQueue = [];
	this.state = STATE_INITIAL;
	this.index = 0;
	this.timeline = new Timeline();
	// this.
}

/**
 * 添加一个同步任务，去加载图片
 * @param imglist 是一个图片的地址 返回一个函数
 */
Anim.prototype.loadImg = function (imglist) {
	//一个同步任务
	let taskFn = function (next) {
		//数组的深拷贝
		loadImage(imglist.slice(), next, null);
	};
	let type = TASK_SYNC;
	//!!!
	return this._add(taskFn, type);
};

/**
 * @param callback 返回的一个任务
 * 咋的了
 */
Anim.prototype.then = function (callback) {};

Anim.prototype.start = function (interval) {
	if (this.state === STATE_START) return this;
	// 如果任务链中没有任务,则返回
	if (!this.taskQueue.length) {
		return this;
	}
	this.state = STATE_START;
	this.interval = interval;
	//真正去执行任务的函数
	this._runTask();
	return this;
};

/**
 * 简单的函数封装，执行callback
 * @param callback 执行的函数
 */
function next (callback) {
	callback && callback();
}

/**
 * 添加一个异步定时任务，通过定时改变图片背景位置，实现帧动画
 * @param ele dom对象
 * @param positions 背景位置数组
 * @param imageUrl 图片地址
 */

Anim.prototype.changePosition = function (ele, positions, imageUrl) {
	var len = positions.length;
	var taskFn;
	var type;
	if (len) {
		//真正的异步定时任务
		var me = this;

		taskFn = function (next, time) {
			//如果指定图片，则设置dom对象的背景图片地址
			if (imageUrl) {
				ele.style.backgroundImage = 'url(' + imageUrl + ')';
			}
			//获得当前背景图片位置索引
			var index = Math.min((time / me.interval) | 0, len);
			var position = positions[index - 1].split(' ');
			//改变dom对象的背景图片位置
			ele.style.backgroundPosition = position[0] + 'px ' + position[1] + 'px';
			//当前任务执行完毕
			if (index === len) {
				next();
			}
		};
		type = TASK_ASYNC;
	}
	else {
		// 如果 len不存在 则执行 task方法
		taskFn = next;
		type = TASK_SYNC;
	}

	return this._add(taskFn, type);
};
/** 
 * @param times reapt times
 * return a function!! the previous animation
*/
Anim.prototype.repeat = function (times) {};

/** 
 *  reapt（）无限循环
*/
Anim.prototype.repeatForever = function (times) {};

/** 
 * @param times reapt（）无限循环
*/
Anim.prototype.wait = function (times) {};

/**
 * 暂停任务
 */
Anim.prototype.pause = function (callback) {};

/**
 * 重新执行上一次暂停的任务
 */
Anim.prototype.restart = function () {};

/**
 * 私有方法:通过命名规范
 * @param {function} taskFn 任务方法
 * @param {number} type 任务类型
 * @private
 */
Anim.prototype._add = function (taskFn, type) {
	this.taskQueue.push({
		taskFn,
		type
	});
	// 链式调用,返回的值 还可以继续调用我现在的方法
	//
	return this;
};
/**
 * 目的 执行任务
 * @private
 */
Anim.prototype._runTask = function () {
	if (!this.taskQueue.length || this.state === STATE_START) return;
	// 如果任务执行完毕,就要回收资源
	if (this.index === this.taskQueue.length) {
		this.dispose();
		return;
	}
	//获得任务链上的当前任务
	let task = this.taskQueue[this.index];
	if (task.type === TASK_SYNC) this._syncTask(task);
	else {
		this._asyncTask(task);
	}
};

/**
 * 释放资源
 */
Anim.prototype.dispose = function () {};

/**
 * 同步任务
 * @param task 执行任务的函数
 * @private
 */
Anim.prototype._syncTask = function (task) {
	var me = this;
	var next = function () {
		//切换到下一个任务
		me._next(task);
	};
	var taskFn = task.taskFn;
	taskFn(next);
};

/**
 * 异步任务
 * @param task 执行异步的函数
 * @private
 */
Anim.prototype._asyncTask = function (task) {
	var me = this;
	//定义每一帧执行的回调函数: time 从开始到现在的时间
	var enterframe = function (time) {
		var taskFn = task.taskFn;
		// 下一个任务的函数
		var next = function () {
			//停止执行当前任务
			me.timeline.stop();
			//执行下一个任务
			me._next(task);
		};
		taskFn(next, time);
	};
	//这里的 onenterframe 回调方法
	this.timeline.onenterframe = enterframe;
	this.timeline.start(this.interval);
};

Anim.prototype._next = function (task) {
	var me = this;
	this.index++;
	task.wait
		? setTimeout(function () {
				me._runTask();
			}, task.wait)
		: this._runTask();
};

// module.exports = function () {
// 	new Anim();
// };
// 类似工程 模板
export default new Anim();
