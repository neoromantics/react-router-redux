import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Todo,
  addTodoAsync,
  toggleTodoAsync,
  updateTodoAsync,
  deleteTodoAsync,
  selectTodos,
  selectTodoError,
} from "../redux/todosSlice";
import { AppDispatch } from "../redux/store";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";

const TodoList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const todos = useSelector(selectTodos);
  const error = useSelector(selectTodoError);
  const [newTodo, setNewTodo] = useState<string>("");
  const [edit, setEdit] = useState<Todo | null>(null);

  const handleAddTodo = () => {
    if (newTodo) {
      dispatch(addTodoAsync(newTodo.trim()));
      setNewTodo("");
    }
  };
  //  pass ID
  // passing reference is risky
  const handleToggleTodo = (todo: Todo) => {
    dispatch(toggleTodoAsync(todo));
  };
  // Pure function is better
  // (id, newTask) =>
  const handleUpdateTodo = () => {
    if (edit) {
      dispatch(updateTodoAsync(edit));
      setEdit(null);
    }
  };

  const handleEditTodo = (todo: Todo) => {
    setEdit(todo);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEdit((prev) => (prev ? { ...prev, title: e.target.value } : null));
  };

  const handleDeleteTodo = (todo: Todo) => {
    dispatch(deleteTodoAsync(todo));
  };

  return (
    <div>
      <h2>Todos</h2>
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <button onClick={handleAddTodo}>Add Todo</button>
      <ul>
        {todos.map((todo) => {
          if (!todo.completed) {
            return (
              <li key={todo.id}>
                {todo.id === edit?.id ? (
                  <>
                    <input
                      type="text"
                      value={edit.title}
                      onChange={handleEditChange}
                    />
                    {/* Pass an id and a new todo */}
                    <button onClick={handleUpdateTodo}>Update Todo</button>
                    <button onClick={() => setEdit(null)}>Cancel</button>
                  </>
                ) : (
                  <>
                    {todo.title}
                    <button onClick={() => handleToggleTodo(todo)}>
                      {todo.completed ? "Mark Incomplete" : "Mark Complete"}
                    </button>
                    <button onClick={() => handleEditTodo(todo)}>Edit</button>
                    <button onClick={() => handleDeleteTodo(todo)}>
                      Delete
                    </button>
                  </>
                )}
              </li>
            );
          }
        })}
      </ul>
      <NavLink to="/completed">View Completed Todos</NavLink>
    </div>
  );
};

export default TodoList;
