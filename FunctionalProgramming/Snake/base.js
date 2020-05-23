// console.log('module works');

// export default () => {
//     const dropFirst = xs => xs.slice(1);
//     const objOf = k => v => ({ [k]: v })

//     const spec = o => x => Object.keys(o)
//         .map(k => objOf(k)(o[k](x)))
//         .reduce((acc, o) => Object.assign(acc, o));
//     // two parameters
//     const rnd = min => max => Math.floor(Math.random() * max) + min

// }

export const dropFirst = xs => xs.slice(1);
export const dropLast  = xs => xs.slice(0, xs.length - 1)
export const objOf     = k => v => ({ [k]: v })

export const spec      = o => x => Object.keys(o)
    .map(k => objOf(k)(o[k](x)))
    .reduce((acc, o) => Object.assign(acc, o));

export const prop      = k => o => o[k];
export const rnd       = min => max => Math.floor(Math.random() * max) + min
//o1 和 o2 会互相覆盖
export const merge     = o1 => o2 => Object.assign({}, o1, o2)

// concalculate
export const mod = x => y => ((y % x) + x) % x // http://bit.ly/2oF4mQ7