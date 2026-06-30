import { useEffect, useState } from "react";
import "./App.css";

function App() {
  // Load todos from localStorage when the app starts
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  const [input, setInput] = useState("");

  // Save todos whenever they change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (!input.trim()) return;

    const newTodo = {
      id: Date.now(),
      text: input,
      completed: false,
    };

    setTodos([...todos, newTodo]);
    setInput("");
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  return (
    <div className="app">
      <h1>Todo App</h1>

      <div className="input-container">
        <input
          type="text"
          placeholder="Enter a task..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTodo()}
        />
        <button onClick={addTodo}>Add</button>
      </div>

      {todos.length === 0 ? (
        <p className="empty">No tasks yet.</p>
      ) : (
        <>
          <ul>
            {todos.map((todo) => (
              <li key={todo.id}>
                <span
                  className={todo.completed ? "completed" : ""}
                  onClick={() => toggleTodo(todo.id)}
                >
                  {todo.text}
                </span>

                <button
                  className="delete-btn"
                  onClick={() => deleteTodo(todo.id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>

          <button className="clear-btn" onClick={clearCompleted}>
            Clear Completed
          </button>
        </>
      )}
    </div>
  );
}

export default App;