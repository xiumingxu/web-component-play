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
  const countRef = useRef();

  //1. 逻辑函数  2.比较不同 false 的时候重新计算, true 的时候不用重新计算
  //  调用时机 useEffect 是在 render 之后执行, 
  //  useMemo 一定有返回值, useMemo 实在 render 中执行
  const double = useMemo(()=>{
    return count * 2;
  }, [count === 3]);
  // const onClick = ()=>{
  //   console.log('Click')
  // }
  const onClick = useCallback(()=>{
    return count * 2;
  },[count === 3])

  return(
    <>
      <button type="button" onClick = {()=>{setCount(count + 1)}}>
        Click({count}), Double:{double}
      </button>
      <Counter ref={countRef} count={double, onClick}/>
    </>
  )
}

export default App;
