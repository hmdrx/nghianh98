// src/App.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTodo } from './features/todosSlice';
import TodoItem from './components/TodoItem';

const App = () => {
  const todos = useSelector(state => state.todos);
  const dispatch = useDispatch();
  const [newTodoText, setNewTodoText] = React.useState('');

  const handleAddTodo = () => {
    if (newTodoText.trim() !== '') {
      dispatch(addTodo(newTodoText));
      setNewTodoText('');
    }
  };

  return (
    <div className="app">
      <h1>Todo App</h1>
      <div className="add-todo">
        <input
          type="text"
          value={newTodoText}
          onChange={e => setNewTodoText(e.target.value)}
          placeholder="Add a new todo"
        />
        <button onClick={handleAddTodo}>Add</button>
      </div>
      <div className="todos">
        {todos.map(todo => (
          <TodoItem key={todo.id} id={todo.id} text={todo.text} />
        ))}
      </div>
    </div>
  );
};

export default App;
