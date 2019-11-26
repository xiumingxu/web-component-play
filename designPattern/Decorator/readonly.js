import { readonly } from "core-decorators";

class Person {
	@readonly
	name () {
		return "zhang san";
	}
}
let p = new Person();
// alert(p.name());
p.name = function () {
	return "hehe";
};
// cannot be changed
console.log(p.name());
