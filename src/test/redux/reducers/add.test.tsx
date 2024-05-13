import { v4 as uuid } from "uuid";

import reducer, {
  add,
  TodosState,
} from "../../../features/todos/todoListSlice";
import generateMockTodos from "../../../utils/generateMockTodos";

const NUMBER_OF_TODOS = 10;
const mockTodo = { completed: false, id: uuid(), value: "TODO item" };

test("Expect to add a TODO to an empty list", () => {
  const previousState: TodosState = { todos: [] };

  expect(reducer(previousState, add(mockTodo))).toEqual({ todos: [mockTodo] });
});

test("Expect to add a TODO to a list of existing TODOs", () => {
  const previousState: TodosState = {
    todos: generateMockTodos(NUMBER_OF_TODOS),
  };
  const todoToBeAdded = { completed: false, id: uuid(), value: "Added TODO" };

  expect(reducer(previousState, add(todoToBeAdded))).toEqual({
    todos: [...previousState.todos, todoToBeAdded],
  });
});
