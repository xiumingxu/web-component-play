class PubSub {
	constructor () {
		this.handlers = {};
	}
	// 订阅事件
	on (eventType, handler) {
		if (!(eventType in this.handlers)) {
			this.handlers[eventType] = [];
		}
		this.handlers[eventType].push(handler);
		return this;
	}
	// 触发事件(发布事件)
	emit (eventType) {
		var self = this;
		var handlerArgs = Array.prototype.slice.call(arguments, 1);
		for (var i = 0; i < self.handlers[eventType].length; i++) {
			self.handlers[eventType][i].apply(self, handlerArgs);
		}
		return self;
	}
	// 删除订阅事件
	off (eventType, handler) {
		var currentEvent = this.handlers[eventType];
		var len = 0;
		if (currentEvent) {
			len = currentEvent.length;
			for (var i = len - 1; i >= 0; i--) {
				if (currentEvent[i] === handler) {
					currentEvent.splice(i, 1);
				}
			}
		}
		return this;
	}
}

var pubsub = new PubSub();
var callback = function (data) {
	console.log(data);
};

//订阅事件A
pubsub.on('A', function (data) {
	console.log(1 + data);
});
pubsub.on('A', function (data) {
	console.log(2 + data);
});
pubsub.on('A', callback);

//触发事件A
pubsub.emit('A', '我是参数');

//删除事件A的订阅源callback
pubsub.off('A', callback);

pubsub.emit('A', '我是第二次调用的参数');
