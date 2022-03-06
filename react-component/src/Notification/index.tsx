import React, {useRef, FC, useCallback, ChangeEvent, ChangeEventHandler, useState, useEffect} from 'react';
import * as uuid from 'uuid'
//Test data
// https://www.youtube.com/watch?v=KYKmqeU6lOI&ab_channel=LetsCode

//好难
interface TestType {
    value: string
    id: number
    other: string
}


interface ObjectWithValue {
    value: string;
}

type OptionType<T={}> = ObjectWithValue & T

interface IdProps {
    id: string
}
type DataSource<T={}> = T & IdProps

interface NotificationProps extends DataSource{ //并没有对interface进行抽象
    value: string;
    onClose: (noteId: string)=>void;
    duration?: number
}
export const Notice: FC<NotificationProps>= (props
)=>{
    // const key: React.Key //    type Key = string | number;
    const {value, id, onClose} = props
    const [timer, setTimer] = useState<NodeJS.Timeout>()
    const [timeLeft, setTimeleft] = useState<number>(6000)

    useEffect(()=>{
        let timeout = setTimeout(()=>[
            onClose(id)
        ], 6000)
        let timeInterval = setInterval(()=>{
            setTimeleft(prevState => prevState-1000)
        }, 1000)
        setTimer(timeout);
    },[])

    useEffect(()=>{
        if(timer){
            console.log(timer)
        }
    })

    const handleClose = useCallback(()=>{
        timer && clearTimeout(timer)
        onClose(id)
    },[])

    return <>
        <span>{timeLeft} | </span>
        <span>{value}</span>
        <button onClick={handleClose}>Close</button>
    </>
}
interface Note {
    id: string
    value: string
}
//timer 和 setStack 怎样联动
export const Notification = ()=>{
    // const stack = useRef<Note[]>([])
    const [stack, setStack] = useState<Note[]>([])
    // trigger notification
    //setStack在timer里没有被渲染

    // Similar to componentDidMount and componentDidUpdate:
    // useEffect(() => {
    //     // Update the document title using the browser API
    //     document.title = `You clicked ${count} times`;
    // });

    useEffect(()=>{
        let interval = setInterval(()=>{
        const notification: Note = {
            id: uuid.v4(),
            value: String(Date())
        };
        setStack([...stack, notification])
            // stack.current.push(notification)
        }, 1000)

        return ()=>{
            clearInterval(interval)
        }
    })
    // notify 的逻辑, 外面加个add
    const handleClose = useCallback( (id)=>{
        // 终于拿到最新的stack了 !!!
        setStack((prevStack)=> prevStack.filter(n=>n.id !== id))
    },[])
    return <>{stack.map(n=><li><Notice key={n.id} {...n} onClose={handleClose}/></li>)}</>

}

