// src/features/todosSlice.js
import { createSlice } from '@reduxjs/toolkit';
import initialTodos from '../initialData';

const todosSlice = createSlice({
  name: 'todos',
  initialState: initialTodos,
  reducers: {
    addTodo: (state, action) => {
      const newTodo = {
        id: Date.now(),
        text: action.payload,
      };
      state.push(newTodo);
      // Save to local storage
      localStorage.setItem('todos', JSON.stringify(state));
    },
    deleteTodo: (state, action) => {
      const idToDelete = action.payload;
      return state.filter(todo => todo.id !== idToDelete);
    },
    editTodo: (state, action) => {
      const { id, newText } = action.payload;
      const todoToEdit = state.find(todo => todo.id === id);
      if (todoToEdit) {
        todoToEdit.text = newText;
      }
    },
  },
});

export const { addTodo, deleteTodo, editTodo } = todosSlice.actions;

export default todosSlice.reducer;
