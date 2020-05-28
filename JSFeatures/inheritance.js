function Animal (shape) {
	this.shape = shape;
	console.log('this is an animal');
}
Animal.prototype = {
	eat : function () {
		console.log('eat');
	}
};
function Dog (shape) {
	Animal.call(this, shape);
	this.sound = 'wangwang';
}
Dog.prototype = Object.create(Animal);

//Dog.prototype =  Object.create(Animal.prototype);
Dog.prototype.listen = function () {
	console.log('listen');
};

// let dog = new Dog('round');





const createEater = (state)=>{
	return {
		eat: (state) => {
			console.log(`I can eat ${state.shape}`);
		}
	}
}

const createSound = (state)=>{
	return {
		sing: (state)=>{
			console.log(`I can sing`);
		},
		sound:(state)=>{
			console.log(`I can sound`);
		}
	}
}

const AnimalPrototype = (shape)=>{
	const state = {
		shape
	}
	function show(){
		console.log(`I am a ${shape}`)
	}

	return Object.assign(state,createEater(state), show)
}

const DogPrototype = (shape) => {
	return Object.assign(AnimalPrototype(shape),createSound())
}

const wangawnag = DogPrototype("rond");

wangawnag.sing();
wangawnag.sound();