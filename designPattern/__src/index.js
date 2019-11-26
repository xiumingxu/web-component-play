import { deprecate } from "core-decorators";

class Person {
	@deprecate
	name () {
		return "zhang san";
	}
}

let p = new Person();
p.name();
