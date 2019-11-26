class Circle {
	draw () {
		console.log("draw a circle");
	}
}
class Decorator {
	constructor (circle) {
		console.log("circle", circle);
		this.circle = circle;
	}
	draw () {
		this.circle.draw();
		this.setRedBorder(circle);
	}
	// the parameter could be several place
	setRedBorder (circle) {
		console.log(circle);
		console.log("draw the red border");
	}
}

// test
let circle = new Circle();
circle.draw();

let dec = new Decorator(circle);
dec.draw();
