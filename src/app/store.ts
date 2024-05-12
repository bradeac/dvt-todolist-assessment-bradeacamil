import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import todoReducer from "../features/todos/todoListSlice";

export const store = configureStore({
  reducer: {
    todos: todoReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
