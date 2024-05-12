import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import todoReducer from "../features/todos/todoListSlice";

const rootReducer = combineReducers({
  todos: todoReducer,
});

export type AppDispatch = AppStore["dispatch"];
export type AppStore = ReturnType<typeof setupStore>;
export type RootState = ReturnType<typeof rootReducer>;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

export function setupStore(preloadedState?: Partial<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
}
