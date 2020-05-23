import {
    spec, prop, 
    merge, dropFirst, dropLast,
    mod,
    rnd
 } from './base.js'




// Constants
export const NORTH = { x: 0, y: -1 }
export const SOUTH = { x: 0, y: 1 }
export const EAST = { x: 1, y: 0 }
export const WEST = { x: -1, y: 0 }




// Constants
// const NORTH = { x: 0, y: -1 }
// const SOUTH = { x: 0, y: 1 }
// const EAST = { x: 1, y: 0 }
// const WEST = { x: -1, y: 0 }


// rdn random is inpure??


const pointEq = p1 => p2 => p1.x === p2.x && p1.y === p2.y;

//Boolean
// const willEat = state => pointEq(nextHead(state)(state.apple))

const rndPos = table => ({
    x: rnd(0)(table.cols - 1),
    y: rnd(0)(table.rows - 1)
})

//
const initialState = () => ({
        cols: 24,
        rows: 14,
        moves: [EAST],
        snake: [],
        apple: { x: 16, y: 2 },
    })

// Booleans
const willEat = state => pointEq(nextHead(state))(state.apple)
const willCrash    = state => state.snake.find(pointEq(nextHead(state)))
// const willCrash    = state =>{
//     const {moves, snake, cols, rows} = state
//     if(snake.length === 0)
//         return false;
//     const {x, y} = moves[0];
//     const head = snake[0];
//     const next = {
//         x: head.x + x,
//         y: head.y + y
//     }
//     if(next.x >= cols || next.x < 0 || next.y >= rows || next.y < 0)
//         return true;
//     return false;
// }

const validMove = move => state => state.moves[0] + move[0] !== 0 || state.moves[1] + move[1] !== 0

// state mutibility
// adot polymorphism + 为啥要dropFirst 也没用enqueue 就是还是原来的方向
const nextMoves    = state => state.moves.length > 1 ? dropFirst(state.moves) : state.moves
const nextApple    = state => willEat(state) ? rndPos(state) : state.apple;

// there is a starting point here
// const nextHead     = state => {
//     const {moves, snake, cols, rows} = state
//     if(snake.length === 0)
//         return {x: 2, y:2};
//     const {x, y} = moves[0];
//     const head = snake[0];
//     return {
//         x: (head.x + x ) % cols,
//         y: (head.y + y) % rows
//     }
// }
const nextHead = state => state.snake.length == 0
    ? { x: 2, y: 2 }
    : {
        x: mod(state.cols)(state.snake[0].x + state.moves[0].x),
        y: mod(state.rows)(state.snake[0].y + state.moves[0].y)
    }
// when eat: 
// when move: remove the end
//
const nextSnake    = state => willCrash(state)
    ?[]
    :(willEat(state))
        ?[nextHead(state)].concat(state.snake)
        :[nextHead(state)].concat(dropLast(state.snake))


// fp 的 typical
// const next = state => {
//     rows: prop('rows')(state),
//     cols: prop('cols')(state),
//     moves: nextMoves(state),
//     snake: nextSnake(state),
//     apple: nextApple(state)
// }
// 用 spec 包裹 ， pipe, applyspec
const next =  spec({
    rows: prop('rows'),
    cols: prop('cols'),
    moves: nextMoves,
    snake: nextSnake,
    apple: nextApple
});


const enqueue = (state, move)=> validMove(move)(state)
 ? merge(state)({moves: state.moves.concat([move]) })
 : state

// this is export as a module
export default {
    pointEq,
    rndPos,
    initialState,
    enqueue,
    next
}