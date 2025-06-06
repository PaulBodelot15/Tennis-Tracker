import React, { useState } from 'react';
import { useTodoStore } from '../../store/todoStore';
import { Todo } from '../../types';

interface TodoFormProps {
  todo?: Todo;
  onClose: () => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ todo, onClose }) => {
  const { addTodo, updateTodo } = useTodoStore();
  const [title, setTitle] = useState(todo?.title || '');
  const [description, setDescription] = useState(todo?.description || '');
  const [priority, setPriority] = useState(todo?.priority || 'medium');
  const [category, setCategory] = useState(todo?.category || 'technique');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) return;
    
    if (todo) {
      updateTodo(todo.id, { title, description, priority: priority as 'low' | 'medium' | 'high', category: category as 'technique' | 'fitness' | 'strategy' | 'mental' | 'other' });
    } else {
      addTodo({
        title,
        description,
        completed: false,
        priority: priority as 'low' | 'medium' | 'high',
        category: category as 'technique' | 'fitness' | 'strategy' | 'mental' | 'other'
      });
    }
    
    onClose();
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="form-label">Title</label>
        <input
          id="title"
          type="text"
          className="form-input w-full"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g., Practice forehand topspin"
          required
        />
      </div>
      
      <div>
        <label htmlFor="description" className="form-label">Description (optional)</label>
        <textarea
          id="description"
          className="form-input w-full"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Additional details about the task"
          rows={3}
        />
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="priority" className="form-label">Priority</label>
          <select
            id="priority"
            className="form-select w-full"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        
        <div>
          <label htmlFor="category" className="form-label">Category</label>
          <select
            id="category"
            className="form-select w-full"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="technique">Technique</option>
            <option value="fitness">Fitness</option>
            <option value="strategy">Strategy</option>
            <option value="mental">Mental</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>
      
      <div className="flex justify-end space-x-3 pt-2">
        <button
          type="button"
          onClick={onClose}
          className="btn btn-secondary"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="btn btn-primary"
        >
          {todo ? 'Update' : 'Add'} Task
        </button>
      </div>
    </form>
  );
};

export default TodoForm;
