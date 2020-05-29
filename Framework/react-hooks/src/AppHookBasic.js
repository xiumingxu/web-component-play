import React, { Component, PureComponent, useCallback, useRef, useEffect,  memo, useState,createContext,useContext, useMemo } from 'react';
import './App.css';

// 要声明 context
const CountContext = createContext();


// //返回功能组件的写法
// function Counter(props){
//   const count = useContext(CountContext);
//   return (<h1>{props.count}</h1>);
  
// }

// memo
//返回功能组件的写法
// const Counter= memo(function Counter(props){
//   console.log("counter render")
//   const count = useContext(CountContext);
//   return (<h1>{props.count}</h1>);
  
// });
//把  counter 变成 purecompopnent, 有 memo 效果的
class Counter extends PureComponent{
  render(){
    const {props} = this;
    return (
      <h1 onClick = {props.onClick}>{props.count}</h1>
    )
  }
}
function App (){
  const [count, setCount] =  useState(0);
  const it = useRef();


  useEffect(()=>{
    it.current = setInterval(()=>{
      setCount(count=>count+1);
    },1000)
  },[]);

  useEffect(()=>{
    if(count>=10){
      clearInterval(it.current);
    }
  })

  return(
    <>
      <button type="button" onClick = {()=>{setCount(count + 1)}}>
        Click({count})
      </button>
    </>
  )
}

export default App;
