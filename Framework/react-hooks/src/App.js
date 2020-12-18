import React, {
  Component,
  PureComponent,
  useCallback,
  useRef,
  useEffect,
  memo,
  useState,
  createContext,
  useContext,
  useMemo
} from 'react';
import { createAdd, createRemove, createSet, createToggle } from './action.js';
import './App.css';
import useMouse from './hooks/useMouse'
// import useMouse from '@react-hook/mouse-position'
// 展示
const App = props => {
  const ref = useRef(null);
  const [x, y] = useMouse(ref);

  return <div >
    <div style={{ width: "800px", height: "600px", background: "grey" }} ref={ref}>
      <span> x : { x}</span>
      <span> y : { y}</span>
     </div>
    </div>

};

export default App;
