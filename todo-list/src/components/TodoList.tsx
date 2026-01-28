import React, { useState } from 'react';
import { RootState, useAppDispatch, useAppSelector } from '../store';
import TodoItem from './TodoItem';
import { Todo } from '../types';

const TodoList: React.FC = () => {
  const { todos, filter } = useAppSelector((state: RootState) => state.todos);
  const dispatch = useAppDispatch();

  const [draggingTodoId, setDraggingTodoId] = useState<string | null>(null);

  const handleDragStart = (id: string) => {
    setDraggingTodoId(id);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (targetId: string) => {
    if (draggingTodoId === null || draggingTodoId === targetId) return;

    const newTodos = [...todos];

    const dragIndex = newTodos.findIndex(t => t.id === draggingTodoId);
    const targetIndex = newTodos.findIndex(t => t.id === targetId);

    const [movedTodo] = newTodos.splice(dragIndex, 1);
    newTodos.splice(targetIndex, 0, movedTodo);

    dispatch({ type: 'todos/reorderTodos', payload: newTodos });
    setDraggingTodoId(null);
  };

  const filteredTodos = todos.filter((todo: Todo) => {
    switch (filter) {
      case 'active':
        return !todo.completed;
      case 'completed':
        return todo.completed;
      default:
        return true;
    }
  });

  if (todos.length === 0) {
    return (
      <div className="todo-list">
        <div className="empty-state">Начните добавлять задачи!</div>
      </div>
    );
  }

  if (filteredTodos.length === 0) {
    return (
      <div className="todo-list">
        <div className="empty-state">
          {filter === 'active' ? 'Все задачи выполнены!' : 'Нет выполненных задач'}
        </div>
      </div>
    );
  }

  return (
    <div className="todo-list">
      {filteredTodos.map((todo) => (
        <div
          key={todo.id}
          draggable
          onDragStart={() => handleDragStart(todo.id)}
          onDragOver={handleDragOver}
          onDrop={() => handleDrop(todo.id)}
          style={{
            padding: '8px',
            margin: '4px 0',
            backgroundColor: '#f0f0f0',
            cursor: 'move',
          }}
        >
          <TodoItem todo={todo} />
        </div>
      ))}
    </div>
  );
};

export default TodoList;