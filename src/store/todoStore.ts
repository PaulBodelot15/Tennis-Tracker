import { create } from 'zustand';
import { Todo } from '../types';

interface TodoState {
  todos: Todo[];
  addTodo: (todo: Omit<Todo, 'id' | 'createdAt'>) => void;
  updateTodo: (id: string, updates: Partial<Omit<Todo, 'id' | 'createdAt'>>) => void;
  deleteTodo: (id: string) => void;
  toggleCompleted: (id: string) => void;
  reorderTodos: (startIndex: number, endIndex: number) => void;
}

const loadTodos = (): Todo[] => {
  const saved = localStorage.getItem('tennis-tracker-todos');
  return saved ? JSON.parse(saved) : [];
};

const saveTodos = (todos: Todo[]) => {
  localStorage.setItem('tennis-tracker-todos', JSON.stringify(todos));
};

export const useTodoStore = create<TodoState>((set) => ({
  todos: loadTodos(),
  addTodo: (todo) => {
    const newTodo: Todo = {
      ...todo,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };

    set((state) => {
      const updatedTodos = [...state.todos, newTodo];
      saveTodos(updatedTodos);
      return { todos: updatedTodos };
    });
  },
  updateTodo: (id, updates) => {
    set((state) => {
      const updatedTodos = state.todos.map((todo) => 
        todo.id === id ? { ...todo, ...updates } : todo
      );
      saveTodos(updatedTodos);
      return { todos: updatedTodos };
    });
  },
  deleteTodo: (id) => {
    set((state) => {
      const updatedTodos = state.todos.filter((todo) => todo.id !== id);
      saveTodos(updatedTodos);
      return { todos: updatedTodos };
    });
  },
  toggleCompleted: (id) => {
    set((state) => {
      const updatedTodos = state.todos.map((todo) => 
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      );
      saveTodos(updatedTodos);
      return { todos: updatedTodos };
    });
  },
  reorderTodos: (startIndex, endIndex) => {
    set((state) => {
      const result = Array.from(state.todos);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      saveTodos(result);
      return { todos: result };
    });
  },
}));
