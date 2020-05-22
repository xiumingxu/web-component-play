import './base.js'

export const NORTH = 'NORTH';
export const EAST = 'EAST';
export const WEST = 'WEST';
export const SOUTH = 'SOUTH';


export default {
    //Constants
    const NORTH = 'NORTH';
    const EAST = 'EAST';
    const WEST = 'WEST';
    const SOUTH = 'SOUTH';


    // curState  validate the move state => next state
// export const enqueue = (state, move)=> validMove(move)(state)
// ?merge()

// rdn random is inpure??

    const pointEq = p1 => p2 => p1.x === p2.x && p1.y === p2.y;
    //Boolean
    const willEat = state=>pointEq(nextHead(state)(state.apple))

    const rndPos = ()=>{}

    //
    const initialState = ()=>({
        cols: 24,
        rows: 14,
        moves: [EAST],
    })

    // fp 的 typical 
    const next = () => { };
    const enqueue = ()=>{

    }
}
