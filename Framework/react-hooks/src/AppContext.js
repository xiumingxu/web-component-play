import React, { Component, useEffect, useState,createContext } from 'react';
import './App.css';

// 要声明 context 也是要在外面
const CountContext = createContext();
class Foo extends Component {
  render () {
    // 这里有 context
    return <CountContext.Consumer>{(count) => <h1> {count} </h1>}</CountContext.Consumer>;
  }
}
function App (){
  const [count, setCount] =  useState(0);
  return(
    <>
      <button type="button" onClick = {()=>{setCount(count + 1)}}>
        Click({count})
      </button>
  
    {/* 这里是 countContext */}
    <CountContext.Provider value={count}>
        <Foo/>
    </CountContext.Provider>
    </>
  )
}

export default App;
