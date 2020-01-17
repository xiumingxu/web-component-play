/*
 * @Author: xiuming.x 
 * @Date: 2019-12-01 11:32:12 
 * @Last Modified by: xiuming.x
 * @Last Modified time: 2019-12-01 13:05:26
 */

//切换切换
(() => {
	var pageA = document.querySelector('.page-a');
	var pageB = document.querySelector('.page-b');
	var pageC = document.querySelector('.page-c');
	let lastOpt = pageA;

	document.querySelector('#page').addEventListener('change', (e) => {
		//页面名称
		let pageName = e.target.value;
		// lastOpt.classList.remove('effect-out');
		switch (pageName) {
			case 'page-b':
				pageA.classList.add('effect-out');
				break;
			case 'page-c':
				//切换到c页面，所以需要在目标c页面执行动画
				//因为让要c页面先放大，然后缩小
				pageC.classList.add('effect-in');
				break;
		}
	});
})();

/**
 * 自适应页面大小
 * @param  {[type]} doc [description]
 * @param  {[type]} win [description]
 * @return {[type]}     [description]
 */
var docEl = document.documentElement,
	resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
	recalc = function () {
		//自适应设置容器高度
		var container = document.querySelector('.container');
		//原始比例
		var proportion = 900 / 1440;
		container.style.height = container.clientWidth * proportion + 'px';
	};
window.addEventListener(resizeEvt, recalc, false);
document.addEventListener('DOMContentLoaded', recalc, false);
