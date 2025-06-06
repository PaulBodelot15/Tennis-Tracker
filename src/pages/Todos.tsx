import React from 'react';
import TodoList from '../components/todos/TodoList';

const Todos: React.FC = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Priority Tasks</h2>
      <TodoList />
    </div>
  );
};

export default Todos;
