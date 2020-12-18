import React, { useEffect , useState} from 'react'
// Please write a simple React component.
// The component takes one prop named "input".
// There are three types of input:

// If the prop is undefined or falsy, return a live-updating date and time (update every second) in a div. Please pretty-format the date and time.
// If the prop is an array, return an list of divs, each containing one element of the array.
// If the prop is anything else, return the value of the prop in a div.
// A functional component using React Hooks is preferred, though not required. displaying instances of the component, one per input type.
// If anyone can help me with this assessment.

const LiveUpdateTimer = () => {
    const [date, setDate] = useState(new Date().toString());
    let timer;
    useEffect(() => {
        timer = setInterval(() => setDate(new Date().toString()), 1000);
        return ()=> {
            clearInterval(timer);
        }
    }, [])
    return <div>{date}</div>
}

export default function (props) {
    const {input} = props
    if (!input) {
        return <LiveUpdateTimer />
    } else if (Array.isArray(input)) {
        return <> {
            input.map(el => <div key={el.toString()}>{el}</div>)}
        </>
    }
  
     return <div>{getValue(input)} </div>    
}

const getValue = (input) => {
    
    
}