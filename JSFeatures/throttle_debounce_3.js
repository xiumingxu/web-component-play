// throttle 

const createThrottle = (fn, delay)=>{
    let timer = null;
    return function(){
        //这里必须是function
        if(timer)
            return;
        timer = setTimeout(()=>{
            fn.apply(this, arguments)
            timer = null;
        }, delay);
    }
}
const fn = (state) => console.log(state);

const throttledFn = createThrottle(fn, 2000);

setInterval(()=>{throttledFn(4)}, 100);


const createDebounceFn= (fn, delay) =>{
    let timer = null;

    return function(){
        if(timer){
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            fn.apply(this, arguments);
        }, delay);
    }
}