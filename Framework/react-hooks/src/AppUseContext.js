import React, { Component, useEffect, useState,createContext,useContext } from 'react';
import './App.css';

// 要声明 context
const CountContext = createContext();

class Bar extends Component {
  //静态变量
  static contextType = CountContext;
  render () {
    // 这里有 contextType 就不需要 consumer 了
    const count = this.context;
    return(<h1> {count} </h1>);
  }
}
function Counter(){
  const count = useContext(CountContext);
  return (<h1>{count}</h1>);
  
}
function App (){
  const [count, setCount] =  useState(0);
  return(
    <>
      <button type="button" onClick = {()=>{setCount(count + 1)}}>
        Click({count})
      </button>
  
    {/* 这里是 countContext,还是需要 provider */}
    <CountContext.Provider value={count}>
        <Bar/>
        <Counter/>
    </CountContext.Provider>
    </>
  )
}

export default App;
