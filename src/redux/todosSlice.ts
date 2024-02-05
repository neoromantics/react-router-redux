import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "./store";

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

interface TodosState {
  todos: Todo[];
  status: "idle" | "loading" | "failed";
  error: string | null;
}

const initialState: TodosState = {
  todos: [],
  status: "idle",
  error: null,
};

export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  const response = await axios.get<Todo[]>("http://localhost:5001/todos");
  return response.data;
});

export const addTodoAsync = createAsyncThunk(
  "todos/addTodo",
  async (title: string) => {
    const response = await axios.post<Todo>("http://localhost:5001/todos", {
      title,
      completed: false,
    });
    return response.data;
  }
);

export const toggleTodoAsync = createAsyncThunk(
  "todos/toggleTodo",
  async (todo: Todo) => {
    const response = await axios.patch<Todo>(
      `http://localhost:5001/todos/${todo.id}`,
      { completed: !todo.completed }
    );
    return response.data;
  }
);

export const updateTodoAsync = createAsyncThunk(
  "todos/updateTodo",
  async (todo: Todo) => {
    const response = await axios.put<Todo>(
      `http://localhost:5001/todos/${todo.id}`,
      todo
    );
    return response.data;
  }
);

export const deleteTodoAsync = createAsyncThunk(
  "todos/deleteTodo",
  async (todo: Todo) => {
    await axios.delete(`http://localhost:5001/todos/${todo.id}`);
    return todo.id;
  }
);

export const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTodos.fulfilled, (state, action: PayloadAction<Todo[]>) => {
        state.status = "idle";
        state.todos = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch todos";
      })
      .addCase(addTodoAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addTodoAsync.fulfilled, (state, action: PayloadAction<Todo>) => {
        state.todos.push(action.payload);
        state.status = "idle";
      })
      .addCase(addTodoAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to add todo";
      })
      .addCase(toggleTodoAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        toggleTodoAsync.fulfilled,
        (state, action: PayloadAction<Todo>) => {
          const index = state.todos.findIndex(
            (todo) => todo.id === action.payload.id
          );
          if (index !== -1) {
            state.todos[index].completed = action.payload.completed;
          }
          state.status = "idle";
        }
      )
      .addCase(toggleTodoAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to toggle todo";
      })
      .addCase(updateTodoAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        updateTodoAsync.fulfilled,
        (state, action: PayloadAction<Todo>) => {
          const index = state.todos.findIndex(
            (todo) => todo.id === action.payload.id
          );
          if (index !== -1) {
            state.todos[index] = action.payload;
          }
          state.status = "idle";
        }
      )
      .addCase(updateTodoAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to update todo";
      })
      .addCase(deleteTodoAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        deleteTodoAsync.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.todos = state.todos.filter(
            (todo) => todo.id !== action.payload
          );
          state.status = "idle";
        }
      )
      .addCase(deleteTodoAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to delete todo";
      });
  },
});

export const selectTodos = (state: RootState) => state.todos.todos;
export const selectTodoStatus = (state: RootState) => state.todos.status;
export const selectTodoError = (state: RootState) => state.todos.error;

export default todosSlice.reducer;
