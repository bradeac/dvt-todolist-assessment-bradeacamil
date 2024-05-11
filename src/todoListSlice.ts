import { createSlice } from "@reduxjs/toolkit";
import { Todo } from "./types";

export interface TodosState {
  todos: Todo[];
}

const initialState: TodosState = {
  todos: [],
};

export const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    add: (state, action) => {
      state.todos = [...state.todos, action.payload];
    },
    check: (state, action) => {
      const newTodos = state.todos.map((todo) => {
        if (todo.id === action.payload.id) {
          return {
            completed: !action.payload.completed,
            id: todo.id,
            value: todo.value,
          };
        }

        return todo;
      });

      state.todos = newTodos;
    },
    remove: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload.id);
    },
  },
});

export const { add, check, remove } = todosSlice.actions;
export default todosSlice.reducer;
