// 打车
class Car {
	constructor (name, info) {
		this.name = name;
		this.info = info;
	}
}

class RapidCar extends Car {
	constructor (name, info, price) {
		super(name, info);
		this.price = price;
	}
}
class TailoredCar extends Car {
	constructor (name, info, price) {
		super(name, info);
		this.price = price;
	}
}

class Trip {
	constructor (car) {
		//RapidCar / TailoredCar
		this.car = car;
	}
	start () {
		console.log(`Start journey: $(this.car.info)`);
	}
	end () {
		console.log(`End journey: $(this.car.price)`);
	}
}
