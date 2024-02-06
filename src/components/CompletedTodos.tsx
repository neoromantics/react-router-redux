import React from "react";
import { useSelector } from "react-redux";
import { Todo, selectTodos, toggleTodoAsync } from "../redux/todosSlice";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";

const CompletedTodos = () => {
  const todos = useSelector(selectTodos);
  const completedTodos = todos.filter((todo) => todo.completed);
  const dispatch = useDispatch<AppDispatch>();

  const handleToggleTodo = (todo: Todo) => {
    dispatch(toggleTodoAsync(todo));
  };

  return (
    <div>
      <h2>Completed Todos</h2>
      <ul>
        {completedTodos.map((todo) => (
          <li key={todo.id}>
            {todo.title}
            <button onClick={() => handleToggleTodo(todo)}>
              {todo.completed ? "Mark Incomplete" : "Mark Complete"}
            </button>
          </li>
        ))}
      </ul>
      <Link to="/">Back to Incompleted Todos</Link>
    </div>
  );
};

export default CompletedTodos;
