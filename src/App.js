import React, { useState, useRef, useEffect } from 'react';
import TodoList from './TodoList';
import { v4 as uuidv4 } from 'uuid';
import './index.css';

function App() {
  const [todos, setTodos] = useState([]);
  const todoNameRef = useRef();
  const LOCAL_STORAGE_KEY = 'todoapp.todos';

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedTodos) setTodos(storedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  function toggleTodo(id) {
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id ===id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  function handleAddTodo() {
    const name = todoNameRef.current.value;
    if (name === '') return;
    const newTodo = { id: uuidv4(), name: name, complete: false };
    setTodos((prevTodos) => [...prevTodos, newTodo]);
    todoNameRef.current.value = '';

    
  }
  function handleClearTodos() {
    const newTodos = todos.filter(todo =>!todo.complete)
    setTodos(newTodos)
}

  return (
    <>
      <TodoList todos={todos} toggleTodo ={toggleTodo}/>
      <input ref={todoNameRef} type="text" />
      <button onClick={handleAddTodo}>Add Todo</button>
      <button onClick={handleClearTodos}>Clear Complete</button>
      <div>{todos.filter(todo => !todo.complete).length} todos left</div>
    </>
  );
}

export default App;
