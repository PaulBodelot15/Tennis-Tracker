import React, { useState } from 'react';
import { CheckSquare, Square, MoreHorizontal, Edit, Trash2, GripVertical } from 'lucide-react';
import { useTodoStore } from '../../store/todoStore';
import { Todo } from '../../types';
import TodoForm from './TodoForm';

interface TodoItemProps {
  todo: Todo;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const { toggleCompleted, deleteTodo } = useTodoStore();
  const [menuOpen, setMenuOpen] = useState(false);
  const [editing, setEditing] = useState(false);

  const priorityColors = {
    low: 'badge-low',
    medium: 'badge-medium',
    high: 'badge-high'
  };

  const categoryLabels: Record<string, string> = {
    technique: 'Technique',
    fitness: 'Fitness',
    strategy: 'Strategy',
    mental: 'Mental',
    other: 'Other'
  };

  if (editing) {
    return <TodoForm todo={todo} onClose={() => setEditing(false)} />;
  }

  return (
    <div className="flex items-center p-3 border border-gray-200 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 shadow-subtle hover:shadow-card transition-shadow">
      <div className="flex items-center mr-3 cursor-grab">
        <GripVertical size={16} className="text-gray-400" />
      </div>
      <button
        className="mr-3 flex-shrink-0"
        onClick={() => toggleCompleted(todo.id)}
      >
        {todo.completed ? (
          <CheckSquare className="h-5 w-5 text-primary-500" />
        ) : (
          <Square className="h-5 w-5 text-gray-400" />
        )}
      </button>
      
      <div className="flex-grow">
        <div className="flex items-center gap-2">
          <span className={todo.completed ? 'line-through text-gray-500 dark:text-gray-400' : 'text-gray-800 dark:text-gray-100 font-medium'}>
            {todo.title}
          </span>
          <span className={`badge ${priorityColors[todo.priority]}`}>
            {todo.priority}
          </span>
          <span className="badge badge-low">
            {categoryLabels[todo.category]}
          </span>
        </div>
        {todo.description && (
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {todo.description}
          </p>
        )}
      </div>
      
      <div className="relative ml-2">
        <button
          className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <MoreHorizontal size={18} className="text-gray-500" />
        </button>
        
        {menuOpen && (
          <div className="absolute right-0 z-10 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1">
            <button
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => {
                setEditing(true);
                setMenuOpen(false);
              }}
            >
              <Edit size={16} className="mr-2" />
              Edit
            </button>
            <button
              className="flex items-center w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => {
                deleteTodo(todo.id);
                setMenuOpen(false);
              }}
            >
              <Trash2 size={16} className="mr-2" />
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoItem;