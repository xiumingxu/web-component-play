// 打车
class Car {
	constructor (num) {
		this.num = name;
	}
}
class Floor {
	constructor (index, slots) {
		this.index = index;
		this.parklots = slots || [];
	}
	emptyLotsNum () {
		let num = 0;
		this.parklots.forEach((lot) => {
			if (lot.empty === true) num++;
		});
		return num;
	}
}
class ParkLot {
	constructor () {
		this.empty = true;
	}
	in () {
		this.empty = false;
	}
	out () {
		this.empty = true;
	}
}

class Park {
	constructor (floors) {
		// empty array: now decide how many floors, but intialize it later
		this.floors = floors || [];
		this.camera = new Camera();
		this.carList = new Map(); // number to car info timestamp
		this.screen = new Screen();
	}
	in (car) {
		const info = this.camera.shot(car);
		// into the lot
		const i = parseInt((Math.random() * 100) % 100);
		const parklot = this.floors[0].places[i];
		parklot.in();

		info.parklot = parklot;
		this.carList[car.num] = info;
	}
	out (car) {
		const info = this.carList[car.num];

		//park lot info clean
		const parklot = info.parklot;
		parklot.out();

		this.screen.show(car, info.inTime);
	}
	emptyLotsNum () {
		let num = 0;
		for (const floor of this.floors) {
			num += floor.emptyLotsNum();
		}
		return num;
	}
}

class Camera {
	// return a car num
	shot (car) {
		return {
			num    : car.num,
			inTime : Date.now()
		};
	}
}
class Screen {
	show (car, inTime) {
		console.log("carNum", car.num);
		console.log("inTime", inTime);
	}
}


for(let i=0; i<)