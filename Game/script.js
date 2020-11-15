/*
 * @Author: xiuming.x 
 * @Date: 2019-12-01 11:32:12 
 * @Last Modified by: xiuming.x
 * @Last Modified time: 2020-11-17 14:22:05
 */

alert('something');

var doc = document;
/**
         * 针对content中的html文本框
         * 增加rem的修改
         * @param  {[type]} doc [description]
         * @param  {[type]} win [description]
         * @return {[type]}     [description]
         */
var docEl = doc.documentElement,
	resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
	recalc = function () {
		//自适应设置容器高度
		var container = document.querySelector('.container');
		//原始比例
		var proportion = 900 / 1440;
		container.style.height = container.clientWidth * proportion + 'px';
	};
window.addEventListener(resizeEvt, recalc, false);
doc.addEventListener('DOMContentLoaded', recalc, false);

/**
 * 下拉选择页面
 * @type {[type]}
 */
var page = document.querySelector('#page');

//层级
var index = 10;
//切换切换
page.addEventListener(
	'change',
	function (e) {
		//页面元素
		var pageElement = document.querySelector('.' + e.target.value);
		pageElement.style.zIndex = ++index;
	},
	false
);
