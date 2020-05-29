import React from 'react';
import './App.css';
// import WithMouse from './Mouse.js'

class App extends React.Component {

  // shouldComponentUpdate((state)=>{
  //   return true;
  // });
  // shouldComponentUpdate();
  constructor(props){
    super(props);
    this.state = {
      x: 0,
      y: 0
    }
  }

  componentDidMount(){
    // document.addEventListener("mouseover", this.handleMouseOver);
  };
  // shouldComponentUpdate(nextProps, nextState){
  //   return true;
  // }
  // componentWillUnmount(){
  //   document.removeEventListener("mouseover", this.handleMouseOver);
  // }

  handleMouseMove = (event) =>{
    this.setState({
      x: event.clientX,
      y: event.clientY
    });
  }


  render(){
    const  {x, y} = this.state;

    return (

        <div className="App" onMouseMove={this.handleMouseMove}>
            <div className="dot" style={{"left": x>600? 600:x, "top": y}}>hehe</div>
        </div>

    );
  }
}


export default App;
