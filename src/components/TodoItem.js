// src/components/TodoItem.js
import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteTodo, editTodo } from '../features/todosSlice';

const TodoItem = ({ id, text }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = React.useState(false);
  const [editedText, setEditedText] = React.useState(text);

  const handleDelete = () => {
    dispatch(deleteTodo(id));
  };

  const handleEdit = () => {
    if (isEditing && editedText.trim() !== '') {
      dispatch(editTodo({ id, newText: editedText }));
    }
    setIsEditing(!isEditing);
  };

  return (
    <div className="todo-item">
      {isEditing ? (
        <input
          type="text"
          value={editedText}
          onChange={e => setEditedText(e.target.value)}
        />
      ) : (
        <p>{text}</p>
      )}
      <div className="buttons">
        <button onClick={handleEdit}>{isEditing ? 'Save' : 'Edit'}</button>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
};

export default TodoItem;
