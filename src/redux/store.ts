import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import todosReducer, { fetchTodos } from "./todosSlice";

export const store = configureStore({
  reducer: {
    todos: todosReducer,
  },
});
store.dispatch(fetchTodos());

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;
