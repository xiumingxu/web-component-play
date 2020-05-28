// 都是builder， 返回object
const charactor = (name)=>{
    const state =
    {
        name: name,
        health: 100
    }
    return Object.assign(state);
}

// 返回object
const canFight = (state) =>{
    return {
        fight: ()=>{
            console.log(`${state.name} takes a mighty swing!`);
            state.stamina--;
        }
    }
}
const canCast = state =>({
    cast: ()=>{
        console.log(`${state.name} can cast a fireBall!`); 
        state.mana--;
    }
})

const figher = (name)=>{
    let state = {
        ...charactor(name),
        stamina: 100
    }
    return Object.assign(state, canFight(state));
}
const maga = (name) => {
    let state = {
        ...charactor(name),
        mana: 100
    }
    return Object.assign(state, canCast(state));
}

const combine = (name) =>{
   let state = {
       ...maga(name),
       ...figher(name)
   }
   return Object.assign(state);
}
const zapper2 = figher("Zapper");
zapper2.fight()

const thumper2 = maga("Thumper");
thumper2.cast()
const combineIn = combine("biubiu");
combineIn.cast();
combineIn.fight();

console.log(Object.entries(combineIn));