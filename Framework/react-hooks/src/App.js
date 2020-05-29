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

let idSeq = Date.now();

function bindActionCreators (actionCreators, dispatch){
  const ret = {};
  // addtodo/ removetodo
  for (let key in actionCreators) {
    ret[key] = function (...args){
      const actionCreator = actionCreators[key];
      const action = actionCreator(...args);
      dispatch(action);
    };
  }
  //类似 dispatch 的职责
  return ret;
}
function combineReducers (reducers){
  return function reducer (state, action){
    const changed = {};

    for (let key in reducers) {
      reducers[key](state[key], action);
    }
  };
}

const LS_KEY = 'LOCALTODOS';
// 输入
function Input (props){
  const { addTodo } = props;
  // 注意 ref 要放在 div 中
  const inputRef = useRef();
  //没有像子组件传递 就不需要

  const onSubmit = e => {
    //否则就会自动刷新界面
    e.preventDefault();

    const todoText = inputRef.current.value.trim();
    if (todoText.length === 0) return;
    //要创建新的 todo

    //这里是构建 又拆解的过程
    addTodo({
      id       : ++idSeq,
      text     : todoText,
      complete : false
    });

    inputRef.current.value = '';
  };

  return (
    <div className='todo-input'>
      <h1>Todos</h1>
      <form onSubmit={onSubmit}>
        <input type='text' ref={inputRef} className='new-todo' placeholder='todo' />
      </form>
    </div>
  );
}

const TodoItem = props => {
  const { todo, todo: { id, text }, removeTodo, toggleTodo } = props;

  const onRemove = () => {
    removeTodo(id);
  };
  const onChange = e => {
    //不应该有 preventDefault
    // e.preventDefault();
    toggleTodo(id);
  };
  return (
    <li className='todo-item' key={todo.id}>
      <input type='checkbox' onChange={onChange} checked={todo.complete} />
      <label className={todo.complete ? 'complete' : ''}> {text} </label>
      <button onClick={onRemove}> X </button>
    </li>
  );
};
// 展示
const Todos = props => {
  const { todos, removeTodo, toggleTodo } = props;
  //传下去
  return (
    <ul className='todos-list-style'>
      {todos.map(todo => {
        return <TodoItem todo={todo} removeTodo={removeTodo} toggleTodo={toggleTodo} />;
      })}
    </ul>
  );
};

const TodoList = () => {
  const [ todos, setTodos ] = useState([]);

  const dispatch = useCallback(action => {
    const { type, payload } = action;
    switch (type) {
      case 'set':
        setTodos(payload);
        break;
      case 'add':
        setTodos(todos => todos.concat(payload));
        break;
      case 'remove':
        setTodos(todos => todos.filter(todo => todo.id != payload));
        break;
      case 'toggle':
        setTodos(todos =>
          todos.map(todo => {
            // thistime payload 是 id
            return todo.id == payload
              ? {
                  ...todo,
                  complete : !todo.complete
                }
              : todo;
          })
        );
        break;
    }
  }, []);

  // 数据
  const reducers = {
    todos (state, action) {
      const { type, payload } = action;

      switch (type) {
        case 'set':
          return {
            ...state,
            todos : payload
          };
        case 'add':
          return {
            ...state,
            todos : payload
          };
        // case ''
      }
    },
    increaseMent (state, action) {}
  };
  // para1: 所有的数据构成的维度
  // para2: action
  const reducer = (state, action) => {
    //处理在有多个 state 的时候 就不能这样了, 多个 action 可能有共同的逻辑,
    // 如果以数据为维度
  };

  // 程序初始一次
  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem(LS_KEY));
    dispatch({ type: 'set', payload: todos });
  }, []);

  //写逻辑要在后面, 只要 todos 发生变化 就需要把 todos 写到 localstorage 中
  useEffect(
    () => {
      localStorage.setItem(LS_KEY, JSON.stringify(todos));
    },
    [ todos ]
  );

  return (
    <div className='todo-list'>
      {/* <Input dispatch={dispatch} /> */}
      <Input {...bindActionCreators({ addTodo: createAdd }, dispatch)} />
      <Todos {...bindActionCreators({ removeTodo: createRemove, toggleTodo: createToggle }, dispatch)} todos={todos} />
    </div>
  );
};

export default TodoList;
