var randoms = {
    [Symbol.iterator]: {
        next() {
            return {
                value: Math.randoms(),
                done: false
            }
        }
    }
}

randoms()