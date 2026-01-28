import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { useAppDispatch } from '../store';
import { toggleTodo, deleteTodo, editTodo } from '../store/todoSlice';
import { Todo } from '../types';

interface TodoItemProps {
  todo: Todo;
}

const TodoContainer = styled.div<{ completed: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  margin-bottom: 8px;
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
`;

const Checkbox = styled.input`
  margin-right: 15px;
  width: 20px;
  height: 20px;
`;

const TodoText = styled.span`
  flex: 1;
  font-size: 1em;
  cursor: pointer;
`;

const TodoInput = styled.input`
  flex: 1;
  padding: 8px;
  font-size: 1em;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;

  &:focus {
    border-color: #007bff;
    box-shadow: 0 0 4px rgba(0, 123, 255, 0.5);
  }
`;

const Actions = styled.div`
  display: flex;
  gap: 8px;
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.2em;
  transition: color 0.2s;

  &:hover {
    color: #007bff;
  }
`;

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const dispatch = useAppDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleSave = () => {
    if (editText.trim()) {
      dispatch(editTodo({ id: todo.id, text: editText }));
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditText(todo.text);
    setIsEditing(false);
  };

  return (
    <TodoContainer completed={todo.completed}>
      <Checkbox
        type="checkbox"
        checked={todo.completed}
        onChange={() => dispatch(toggleTodo(todo.id))}
      />

      {isEditing ? (
        <TodoInput
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onBlur={handleSave}
          onKeyPress={(e) => e.key === 'Enter' && handleSave()}
          onKeyDown={(e) => e.key === 'Escape' && handleCancel()}
          autoFocus
        />
      ) : (
        <TodoText onDoubleClick={() => setIsEditing(true)}>
          {todo.text}
        </TodoText>
      )}

      <Actions>
        <ActionButton onClick={() => setIsEditing(!isEditing)} title={isEditing ? 'Cancel editing' : 'Edit'}>
          {isEditing ? '' : '✏️'}
        </ActionButton>
        <ActionButton onClick={() => dispatch(deleteTodo(todo.id))} title="Delete">
          🗑️
        </ActionButton>
      </Actions>
    </TodoContainer>
  );
};

export default TodoItem;