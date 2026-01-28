import { useEffect } from 'react';
import { Todo } from '../types';

export const useLocalStorage = (todos: Todo[]) => {
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const getStoredTodos = (): Todo[] => {
    if (typeof window === 'undefined') return [];
    const stored = localStorage.getItem('todos');
    return stored ? JSON.parse(stored) : [];
  };

  return { getStoredTodos };
};
