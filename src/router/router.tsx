import { createBrowserRouter } from "react-router-dom";
import TodoList from "../components/TodoList";
import CompletedTodos from "../components/CompletedTodos";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <TodoList />,
  },
  {
    path: "/completed",
    element: <CompletedTodos />,
  },
]);
