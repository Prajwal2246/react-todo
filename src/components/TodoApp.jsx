import React from "react";
import { useState } from "react";
import "./TodoApp.css";

const TodoApp = () => {
  const [todolist, setTodolist] = useState([]);
  const [input, setInput] = useState("");

  function addTask(e) {
    e.preventDefault();
    if (input.trim() === "") return;
    const newTask = {
      id: Date.now(),
      text: input,
      completed: false,
    };
    setTodolist([...todolist, newTask]);
    setInput("");
  }

  function handleComplete(id) {
    const updatedList = todolist.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodolist(updatedList);
  }

  function handleDelete(id) {
    const upatedList = todolist.filter((todo) => todo.id !== id);
    setTodolist(upatedList);
  }

  function handleChange(e) {
    setInput(e.target.value);
  }

  return (
    <div className="main-container">
      <div className="container">
        <h2>Todos</h2>
        {todolist.length === 0 ? (
          <p>No items</p>
        ) : (
          <ul>
            {todolist.map((todo, index) => (
              <li key={todo.id}>
                <div className="todo-content">
                  <span
                    className="todo-text"
                    style={{
                      textDecoration: todo.completed ? "line-through" : "none",
                    }}
                  >
                    {todo.text}
                  </span>
                  <div className="button-group">
                    <button
                      className="complete"
                      onClick={() => handleComplete(todo.id)}
                    >
                      {todo.completed ? "Undo" : "Complete"}
                    </button>
                    <button
                      className="delete"
                      onClick={() => handleDelete(todo.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
        <form onSubmit={addTask}>
          <input
            type="text"
            placeholder="Add todo here"
            value={input}
            onChange={handleChange}
          />
          <button type="submit" className="add-btn">
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default TodoApp;
