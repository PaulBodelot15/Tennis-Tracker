import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { Plus, Filter } from 'lucide-react';
import { useTodoStore } from '../../store/todoStore';
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';
import EmptyState from '../ui/EmptyState';
import { CheckSquare } from 'lucide-react';

const TodoList: React.FC = () => {
  const { todos, reorderTodos } = useTodoStore();
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState<string>('all');
  
  const handleDragEnd = (result: DropResult) => {
    const { destination, source } = result;
    
    // Dropped outside the list
    if (!destination) return;
    
    // Dropped in the same position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) return;
    
    reorderTodos(source.index, destination.index);
  };
  
  const filteredTodos = todos.filter((todo) => {
    if (filter === 'all') return true;
    if (filter === 'completed') return todo.completed;
    if (filter === 'active') return !todo.completed;
    if (filter === 'technique' || filter === 'fitness' || 
        filter === 'strategy' || filter === 'mental' || filter === 'other') {
      return todo.category === filter;
    }
    return true;
  });
  
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap justify-between items-center gap-4">
        <h3 className="text-xl font-semibold">Training Priority Tasks</h3>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <button className="btn btn-secondary flex items-center gap-2">
              <Filter size={16} />
              <span>Filter</span>
            </button>
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg z-10 hidden group-hover:block">
              <div className="py-1">
                <button onClick={() => setFilter('all')} className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left">All</button>
                <button onClick={() => setFilter('active')} className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left">Active</button>
                <button onClick={() => setFilter('completed')} className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left">Completed</button>
                <button onClick={() => setFilter('technique')} className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left">Technique</button>
                <button onClick={() => setFilter('fitness')} className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left">Fitness</button>
                <button onClick={() => setFilter('strategy')} className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left">Strategy</button>
                <button onClick={() => setFilter('mental')} className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left">Mental</button>
              </div>
            </div>
          </div>
          <button 
            className="btn btn-primary flex items-center gap-2"
            onClick={() => setShowForm(true)}
          >
            <Plus size={16} />
            <span>Add Task</span>
          </button>
        </div>
      </div>
      
      {showForm && (
        <div className="card mb-6">
          <TodoForm onClose={() => setShowForm(false)} />
        </div>
      )}
      
      <div className="card">
        {filteredTodos.length > 0 ? (
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="todo-list">
              {(provided) => (
                <ul
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="space-y-2"
                >
                  {filteredTodos.map((todo, index) => (
                    <Draggable key={todo.id} draggableId={todo.id} index={index}>
                      {(provided, snapshot) => (
                        <li
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`transition-all ${snapshot.isDragging ? 'dragging' : ''}`}
                        >
                          <TodoItem todo={todo} />
                        </li>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </DragDropContext>
        ) : (
          <EmptyState
            icon={CheckSquare}
            title="No tasks found"
            description="Add your first training task to get started"
            action={
              <button className="btn btn-primary" onClick={() => setShowForm(true)}>
                Add a task
              </button>
            }
          />
        )}
      </div>
    </div>
  );
};

export default TodoList;
