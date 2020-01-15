// context
// let stateMachine = function () {};

class State {
	constructor (name, next, transitionFn) {
		this.cur = name;
		// this.state = name;
		this.next = next;
		this.transitionFn = transitionFn;
	}
	transitionTo () {
		let cur = document.getElementById('color-' + this.cur);
		let next = document.getElementById('color-' + this.next);

		cur.click();
		this.transitionFn();
		return this.next;
	}
	getState () {
		return this.cur;
	}
	// setState () {
	// 	transitionFn();
	// }
	// transition
	// handle () {
	//     console.log(current State)
	// }
}
let createState = (state, nextState, handle) => {
	return new State(state, nextState, handle);
};

// state machine

class TrafficLight {
	constructor () {
		let redState = createState('red', 'yellow', () => {
			console.log('不能走');
		});

		let yellowState = createState('yellow', 'green', () => {
			console.log('等等');
		});

		let greenState = createState('green', 'red', () => {
			console.log('可以走');
		});

		this.stateList = [ redState, yellowState, greenState ];

		this.state = redState;
	}
	run () {
		setInterval(() => {
			this.setState();
		}, 2000);
	}
	setState () {
		// 应该有个 fire之类的
		let nextID = this.state.transitionTo();
		console.log('next', nextID);

		this.state = this.stateList.filter((state) => {
			// console.log('next', state.next);
			return state.getState() === nextID;
		})[0];
		console.log(this.state);

		// this.state = nextState;

		// console.log('nextState,', nextState);
	}
}

let context = new TrafficLight();
context.run();
