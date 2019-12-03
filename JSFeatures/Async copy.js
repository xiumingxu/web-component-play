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
Dog.prototype = new Animal();

//Dog.prototype =  Object.create(Animal.prototype);
Dog.prototype.listen = function () {
	console.log('listen');
};

let dog = new Dog('round');
