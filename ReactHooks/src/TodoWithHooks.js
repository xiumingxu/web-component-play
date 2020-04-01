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
import './App.css';

let idSeq = Date.now();

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
  const { todo, todo: { id, text }, toggleTodo, removeTodo } = props;

  const onRemove = () => {
    removeTodo(id);
  };
  const onChange = e => {
    //不应该有 preventDefault
    // e.preventDefault();
    toggleTodo(id);
  };
  return (
    <li className='todo-item'>
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
        return <TodoItem todo={todo} toggleTodo={toggleTodo} removeTodo={removeTodo} />;
      })}
    </ul>
  );
};

const TodoList = () => {
  const [ todos, setTodos ] = useState([]);
  const addTodo = useCallback(todo => {
    // set 是一个 tool
    setTodos(todos => todos.concat(todo));
  }, []);
  const removeTodo = useCallback(id => {
    setTodos(todos =>
      todos.filter(todo => {
        return todo.id != id;
      })
    );
  }, []);
  const toggleTodo = useCallback(id => {
    setTodos(todos =>
      todos.map(todo => {
        return todo.id == id
          ? // 这里写的很有意思
            {
              ...todo,
              complete : !todo.complete
            }
          : todo;
      })
    );
  }, []);

  const dispatch = action => {};
  // 程序初始一次
  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem(LS_KEY));
    setTodos(todos);
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
      <Input addTodo={addTodo} />
      <Todos removeTodo={removeTodo} toggleTodo={toggleTodo} todos={todos} />
    </div>
  );
};

export default TodoList;
