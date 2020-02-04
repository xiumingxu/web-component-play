class Pub {
	constructor () {
		this.list = {};
	}

	subscribe (eventType, listener) {
		if (!this.list[eventType]) this.list[eventType] = [];
		this.list[eventType].push(listener);
	}

	notify (eventType) {
		this.list[eventType].forEach((listener) => {
			// listener();
			listener(eventType);
		});
	}
	unsubscribe (eventType, listener) {
		let curList = this.list[eventType];
		let index = curList.indexOf(listener);
		if (index !== -1) {
			curList.splice(index, 1);
		}
	}
}

let publisher = new Pub();
let listener1 = (e) => {
	console.log('i am listner1 on' + e);
};
let listener2 = (e) => {
	console.log('i am listner2 on ' + e);
};

publisher.subscribe('A', listener1);
publisher.subscribe('B', listener1);
publisher.subscribe('A', listener2);
publisher.subscribe('B', listener2);

publisher.notify('A');

publisher.unsubscribe('A', listener1);
publisher.notify('A');
publisher.notify('B');
