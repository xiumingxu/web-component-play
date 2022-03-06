import React, {FC, useState} from "react";
import {createPortal} from "react-dom";
import styled, {keyframes} from 'styled-components'
import {uuidv4} from "msw/lib/types/utils/internal/uuidv4";

export function createContainer() {
    const portalId = "notifyContainer";
    let element = document.getElementById(portalId);

    if (element) {
        return element;
    }

    element = document.createElement("div");
    element.setAttribute("id", portalId);
    element.style.position = 'fixed'
    element.style.top = '16px'
    element.style.right = '16px'
    document.body.appendChild(element);

    return element;
}



const container = createContainer();

interface NoticationProps{
    note: NotificationContent
    onDelete: (n: NotificationContent) => any
}
let timeToDelete = 300;

const Notification: FC<NoticationProps> =  (props) => {
    const {  note, children, onDelete} = props
    const [isClosing, setIsClosing] = React.useState(false);

    return createPortal(
        <div>
            {children}
            <button  onClick={()=>onDelete(note)}>
                Close
            </button>
        </div>,
        container
    );
}

enum Color {
    'info',
     'success',
     'warning',
     'error',
}
interface NotificationContent {
    id: string,
    message: string,
    color: Color
}
export const  Notifications: FC = (props) =>{
    const [notifications, setNotifications] = useState<NotificationContent[]>([]);


    const createNotification = (color: Color) => {
        const id = String(notifications.length)
        const newnote: NotificationContent = {color, id, message: id +'hehe'}
        setNotifications([...notifications,newnote ]);
    }

    const handleDelete  = (note: NotificationContent)=>{
        setNotifications(notifications.filter(n => n.id !== note.id))

    }

    return (
        <div className="App">
            <button onClick={() => createNotification(Color.info)}>Info</button>
            <button onClick={() => createNotification(Color.success)}>Success</button>
            <button onClick={() => createNotification(Color.warning)}>Warning</button>
            <button onClick={() => createNotification(Color.error)}>Error</button>
            {notifications.map((note ) => (
                <Notification key={note.id} note ={note} onDelete={handleDelete}>
                    notification!
                </Notification>
            ))}
        </div>
    );
}


// const slideIn = keyframes`
//     from {
//       transform: translateX(100%);
//     }
//     to {
//       transform: translateX(0%);
//     }
// `

