import { useTodoStore } from '../todoStore';

describe('todoStore', () => {
  beforeEach(() => {
    useTodoStore.setState({ todos: [] });
    localStorage.clear();
  });

  const sample = {
    title: 'Task',
    description: 'desc',
    completed: false,
    priority: 'low' as const,
    category: 'technique' as const,
  };

  test('adds a todo', () => {
    useTodoStore.getState().addTodo(sample);
    const todos = useTodoStore.getState().todos;
    expect(todos).toHaveLength(1);
    expect(todos[0].title).toBe('Task');
    expect(todos[0].id).toBeDefined();
    expect(todos[0].createdAt).toBeDefined();
    const stored = JSON.parse(localStorage.getItem('tennis-tracker-todos')!);
    expect(stored).toHaveLength(1);
  });

  test('updates a todo', () => {
    useTodoStore.getState().addTodo(sample);
    const id = useTodoStore.getState().todos[0].id;
    useTodoStore.getState().updateTodo(id, { title: 'New' });
    expect(useTodoStore.getState().todos[0].title).toBe('New');
  });

  test('deletes a todo', () => {
    useTodoStore.getState().addTodo(sample);
    const id = useTodoStore.getState().todos[0].id;
    useTodoStore.getState().deleteTodo(id);
    expect(useTodoStore.getState().todos).toHaveLength(0);
    const stored = JSON.parse(localStorage.getItem('tennis-tracker-todos')!);
    expect(stored).toHaveLength(0);
  });
});
