import { useState, useEffect } from 'react';

type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const res = await fetch('/api/todos');
    const data = await res.json();
    setTodos(data);
  };

  const addTodo = async () => {
    if (!newTodo.trim()) return;
    const res = await fetch('/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: newTodo }),
    });
    const data = await res.json();
    setTodos([data, ...todos]);
    setNewTodo('');
  };

  const completeTodo = async (id: number) => {
    await fetch(`/api/todos/${id}`, { method: 'PUT' });
    fetchTodos();
  };

  const deleteTodo = async (id: number) => {
    await fetch(`/api/todos/${id}`, { method: 'DELETE' });
    fetchTodos();
  };

  return (
    <main style={{ padding: '2rem', maxWidth: '600px', margin: 'auto' }}>
      <h1>📝 To-Do List</h1>

      <div>
        <input
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Tambahkan tugas..."
        />
        <button onClick={addTodo}>Tambah</button>
      </div>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id} style={{ margin: '1rem 0' }}>
            <span
              style={{
                textDecoration: todo.completed ? 'line-through' : 'none',
                marginRight: '1rem',
              }}
            >
              {todo.title}
            </span>
            {!todo.completed && (
              <button onClick={() => completeTodo(todo.id)}>Selesai</button>
            )}
            <button onClick={() => deleteTodo(todo.id)} style={{ marginLeft: '0.5rem' }}>
              Hapus
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}
