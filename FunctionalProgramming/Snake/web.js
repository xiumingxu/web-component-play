import Snake, { NORTH, WEST, EAST, SOUTH } from './snake.js';

let state = Snake.initialState();


const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// map canvas to state pixels
const x = c => Math.round(c * canvas.width/state.cols);
const y = c => Math.round(c * canvas.height/state.rows);

const draw = ()=>{
    //clear
    ctx.fillStyle = "#355";
    ctx.fillRect(0,0,canvas.width, canvas.height);

    //draw snake
    ctx.fillStyle = '#339'
    // x, y , width, height
    state.snake.map(p => ctx.fillRect(x(p.x), y(p.y), x(1), y(1)));

    //draw apple
    ctx.fillStyle = '#f30'
    ctx.fillRect(x(state.apple.x), y(state.apple.y), x(1), y(1));

    // flassh when crash
    if(state.snake.length ==0 ){
        ctx.fillStyle = '#f00'
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}
// Game loop update
const step = t1 => t2 => {
	if (t2 - t1 > 100) {
		//new state
		state = Snake.next(state);
		// draw the global state to the canvas
		draw();
		window.requestAnimationFrame(step(t2));
	}
	else {
		//regulate the time interval
		window.requestAnimationFrame(step(t1));
	}
};

// key event
window.addEventListener('keydown', e => {
	switch (e.key) {
        case 'w': case 'h': case 'ArrowUp': state = Snake.enqueue(state, NORTH); break;
        case 'a': case 'j': case 'ArrowLeft': state = Snake.enqueue(state, WEST); break;
        case 's': case 'k': case 'ArrowDown': state = Snake.enqueue(state, SOUTH); break;
        case 'd': case 'l': case 'ArrowRight': state = Snake.enqueue(state, EAST); break;
	}
});
// render enginee
draw();
//time intervals
window.requestAnimationFrame(step(0));
