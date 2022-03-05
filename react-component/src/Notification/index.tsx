import React, {useRef, FC, useCallback, ChangeEvent, ChangeEventHandler, useState, useEffect} from 'react';
import * as uuid from 'uuid'
//Test data
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
    onDisappear: (noteId: string)=>void;
}
export const Notification: FC<NotificationProps>= (props
)=>{
    const {value, id, onDisappear} = props
    // useEffect(()=>{
    //     let timeout = setTimeout(()=>[
    //         onDisappear(id)
    //     ], 6000)
    //     return ()=>{
    //         clearTimeout(timeout)
    //     }
    // },[])

    const handleDismiss = useCallback(()=>{
        onDisappear(id)
    },[])

    return <>
        <span>{value}</span>
        <button onClick={handleDismiss}>Dismiss</button>
    </>
}
interface Note {
    id: string
    value: string
}
//timer 和 setStack 怎样联动
export const Story = ()=>{
    // const stack = useRef<Note[]>([])
    const [stack, setStack] = useState<Note[]>([])
    // trigger notification
    //setStack在timer里没有被渲染
    useEffect(()=>{
        let interval = setInterval(()=>{
        const notification: Note = {
            id: uuid.v4(),
            value: String(Date())
        };
        console.log("should increate", stack)
        setStack([...stack, notification])
            // stack.current.push(notification)
        }, 1000)

        return ()=>{
            clearInterval(interval)
        }
    })
    // notify 的逻辑, 外面加个add
    const handleNotificationDisappear = useCallback( (id)=>{
        // 终于拿到最新的stack了 !!!
        setStack((prevStack)=> prevStack.filter(n=>n.id !== id))
    },[])
    return <>{stack.map(n=><li><Notification {...n} onDisappear={handleNotificationDisappear}/></li>)}</>

}

