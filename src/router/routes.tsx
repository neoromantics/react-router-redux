import { createBrowserRouter } from "react-router-dom";
import TodoList from "../components/TodoList";
import CompletedTodos from "../components/CompletedTodos";
import HomePage from "../components/HomePage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    children: [
      {
        index: true,
        element: <TodoList />,
      },
      {
        path: "completed",
        element: <CompletedTodos />,
      },
    ],
  },
]);
