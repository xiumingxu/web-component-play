import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

class App2 extends React.Component {
  state = {
    count : 0,
    size  : {
      width  : document.documentElement.clientWidth,
      height : document.documentElement.clientHeight
    }
  };
  onResize = () => {
    this.setState({
      size : {
        width  : document.documentElement.clientWidth,
        height : document.documentElement.clientHeight
      }
    });
  };
  //装饰器的写法还不够成熟
  // @bind()
  // onResize()
  componentDidMount () {
    document.title = this.state.count;
    window.addEventListener('resize', this.onResize, false);
  }
  //是 set
  render () {
    const { count, size } = this.state;
    return (
      <div>
        <button
          type='button'
          onClick={() => {
            this.setState({ count: count + 1 });
          }}
        />
        <h1>Click: {count}</h1>
        <h1>
          size: {size.width} * {size.height}
        </h1>
      </div>
    );
  }
}
function App (){
  const [ count, setCount ] = useState(0);
  // 统一在 render 之后调用, 不用管事 update/will mount
  const [ size, setSize ] = useState({
    width  : document.documentElement.clientWidth,
    height : document.documentElement.clientHeight
  });
  useEffect(() => {
    document.title = count;
  });

  const onResize = () => {
    // ()
    setSize({
      width  : document.documentElement.clientWidth,
      height : document.documentElement.clientHeight
    });
  };
  // 绑定函数: 不知道为什么不能用this.onREsize了
  useEffect(() => {
    //  window.addEventListener("resize", ()=>this.onResize())
    window.addEventListener('resize', onResize, true);
    //解绑
    return () => {
      window.removeEventListener('resize', onResize, false);
    };
    //[] 这样解绑世界就初始换完毕了, 不需要每次都接绑 加绑定
  }, []);

  /* <button type="button" 
                onClick={()=>{this.setState({count: count + 1})}}>  */
  //括号必须紧跟在 return 后面
  return (
    <div>
      <button
        type='button'
        onClick={() => {
          setCount(count + 1);
        }}>
        Click: {count}
      </button>
      <h1>
        {' '}
        size :{size.width} * {size.height}
      </h1>
    </div>
  );
}

export default App;
