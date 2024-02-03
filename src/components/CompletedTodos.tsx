import React from "react";
import { useSelector } from "react-redux";
import { selectTodos } from "../redux/todosSlice";
import { Link } from "react-router-dom";

const CompletedTodos = () => {
  const todos = useSelector(selectTodos);
  const completedTodos = todos.filter((todo) => todo.completed); // Ensure this filtering

  return (
    <div>
      <h2>Completed Todos</h2>
      <ul>
        {completedTodos.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
      <Link to="/">Back to Todos</Link>
    </div>
  );
};

export default CompletedTodos;
