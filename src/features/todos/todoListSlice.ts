import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Todo } from "../../types/Todo.type";

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
    add: (state, action: PayloadAction<Todo>) => {
      state.todos = [...state.todos, action.payload];
    },
    check: (state, action: PayloadAction<Pick<Todo, "id">>) => {
      const newTodos = state.todos.map((todo) => {
        if (todo.id === action.payload.id) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }

        return todo;
      });

      state.todos = newTodos;
    },
    remove: (state, action: PayloadAction<Pick<Todo, "id">>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload.id);
    },
  },
});

export const { add, check, remove } = todosSlice.actions;
export default todosSlice.reducer;
