
const Task = {
    setID: function (ID) { this.id = ID; },
    outputID: function () { console.log(this.id); }
};
// 让XYZ委托Task
const XYZ = Object.create(Task);
XYZ.prepareTask = function (ID, Label) {
    this.setID(ID);
    this.label = Label;
};
XYZ.outputTaskDetails = function () {
    this.outputID();
    console.log(this.label);
};

const x = Object.create(XYZ)
x.prepareTask(1, 2)
console.log(x.hasOwnProperty('prepareTask'))
console.log(XYZ.hasOwnProperty('prepareTask')) // true
console.log(XYZ.hasOwnProperty('setID')) // false
console.log(x.hasOwnProperty('setID'))
// ABC = Object.create( Task ); // ABC ... = ...
