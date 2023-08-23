// src/App.js
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  useGetTodosQuery,
  useAddTodoMutation,
  useEditTodoMutation,
  useDeleteTodoMutation,
} from './api/todosApi';
import { setTodos } from './slices/todosSlice';
import './App.css';

function App() {
  const dispatch = useDispatch();
  const todos = useSelector(state => state.todos.todos);
  const { data: apiTodos } = useGetTodosQuery();
  const [addTodo] = useAddTodoMutation();
  const [editTodo] = useEditTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();
  const [newTodoTitle, setNewTodoTitle] = useState('');

  useEffect(() => {
    if (apiTodos) {
      dispatch(setTodos(apiTodos));
    }
  }, [apiTodos, dispatch]);

  const handleAddTodo = async () => {
    if (newTodoTitle) {
      await addTodo({
        title: newTodoTitle,
        completed: false,
        userId: 1, // You can adjust this based on your requirements
      });
      setNewTodoTitle('');
    }
  };

  const handleEditTodo = async (id, updatedTodo) => {
    await editTodo({
      id,
      ...updatedTodo,
    });
  };

  const handleDeleteTodo = async id => {
    await deleteTodo(id);
  };

  return (
    <div className="App">
      <h1>Todo List</h1>
      <div className="add-todo">
        <input
          type="text"
          placeholder="Enter a new todo..."
          value={newTodoTitle}
          onChange={e => setNewTodoTitle(e.target.value)}
        />
        <button onClick={handleAddTodo}>Add Todo</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Completed</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {todos.map(todo => (
            <tr key={todo.id}>
              <td>{todo.id}</td>
              <td>{todo.title}</td>
              <td>{todo.completed ? 'Yes' : 'No'}</td>
              <td>
                <button
                  onClick={() =>
                    handleEditTodo(todo.id, { completed: !todo.completed })
                  }
                >
                  {todo.completed ? 'Mark Incomplete' : 'Mark Complete'}
                </button>
              </td>
              <td>
                <button onClick={() => handleDeleteTodo(todo.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
