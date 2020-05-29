import React from 'react';
import './App.css';

import {withMouse} from './Mouse.js'
import { withResize } from './withResize';

// const App = withMouse(class App extends React.Component {

//   // shouldComponentUpdate((state)=>{
//   //   return true;
//   // });
//   // shouldComponentUpdate();


//   // handleMouseMove = (event) =>{
//   //   this.setState({
//   //     x: event.clientX,
//   //     y: event.clientY
//   //   });
//   // }


//   render(){
//     const  {x, y} = this.props.mouse;
//     return (
//         <div className="App">
//             <div className="dot" style={{"left": x>600? 600:x, "top": y}}>hehe</div>
//         </div>
//     );
//   }
// })

const App = withResize(function App(props){
    const { width, height } = props;
    return (
      <div className="App">
          <p>{width}</p>
          <p>{height}</p>
      </div>
    );
  }
)


export default App;
