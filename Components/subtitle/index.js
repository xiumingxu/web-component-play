// 题目是写视频的字幕系统，
// 存储的数据结构是什么样，
// 怎么样找该display哪条字幕，
// 什么时候显示完了怎么处理。
// 还有意思意思写一下html结构跟css，这个太简单感觉面试官不怎么care。

//callback


// 给了几个css layout 的warm up 怎样做grid system

// 然后问如何设计youtube的 timeline update with subtitle， 

// 如何设计不支持的浏览器support和设计最佳存储方式 
// 前端如何调用api 支持多种语言。。 
// 不做这个方面基本很难答好


//document.getElementById("myVideo").currentTime = 5;
const captions = { timeStamp1: "caption content asdf...", timeStamp2: "caption content zxcv..." };

function tick (timeStamp) {
	captions[timeStamp];
}
