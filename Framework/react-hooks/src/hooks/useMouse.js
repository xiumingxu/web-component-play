const { useState, useEffect } = require('react')

export default function useMouse(ref = {}) {
    const [x, setX] = useState(0)
    const [y, setY] = useState(0)

    
    const mouseMoveHanlder = (e) => {
        setX(e.clientX);
        setY(e.clientY);
    }
    
    useEffect(() => {
        if (!ref || !ref.current)
            return;
        ref.current.addEventListener('mousemove', mouseMoveHanlder);
        return ()=>
            ref.current.removeEventListener('mousemove', mouseMoveHanlder);
    }, [ref.curent]);
    return [x, y]
}