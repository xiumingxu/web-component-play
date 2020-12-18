import React from 'react';
import './App.css';

import {withMouse} from './Mouse.js'
import { withResize } from './withResize';
import RampAccess from './components/rampAccess';

// const App = withMouse(class App extends React.Component {

//   render(){
//     const  {x, y} = this.props.mouse;
//     return (
//         <div className="App">
//             <div className="dot" style={{"left": x>600? 600:x, "top": y}}>hehe</div>
//         </div>
//     );
//   }
// })

// const App = withResize(function App(props){
//     const { width, height } = props;
//     return (
//       <div className="App">
//           <p>{width}</p>
//           <p>{height}</p>
//       </div>
//     );
//   }
// )

function App() {
  const array = [1,2,3]
  const obj = { array: 1 }
  return <div>
    <h1> RampAccess </h1>
    <RampAccess />
    <RampAccess input={array} /> 
    <RampAccess input={[1, 2, 3]}> </RampAccess>
    <RampAccess input={obj}> </RampAccess>

  </div>
}
export default App;
