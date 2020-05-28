class Charactor{
    constructor(name){
        this.name = name;
        this.health = 100;
    }
}
class Fighter extends Charactor{
    constructor(name){
        super(name);
        this.stamina = 100;
    }

    fight(){
        console.log(`${this.name} takes a mighty swing!`);
        this.stamina--;
    }
}

class Mage extends Charactor{
    constructor(name){
        super(name);
        this.mana = 100;
    }

    cast(){
        console.log(`${this.name} casts a fireball`);
        this.mana--;
    }
}

const zapper = new Mage('Zapper');
const thumper = new Fighter('Thumper');

console.log(zapper.cast());
console.log(thumper.fight());