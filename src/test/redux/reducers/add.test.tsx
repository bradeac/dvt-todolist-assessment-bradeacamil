import reducer, {
  add,
  TodosState,
} from "../../../features/todos/todoListSlice";
import { v4 as uuid } from "uuid";

const NUMBER_OF_TODOS = 10;
const todo = { completed: false, id: uuid(), value: "TODO item" };

test("Expect to add a TODO to an empty list", () => {
  const previousState: TodosState = { todos: [] };

  expect(reducer(previousState, add(todo))).toEqual({ todos: [todo] });
});

test("Expect to add a TODO to a list of existing TODOs", () => {
  const previousState: TodosState = {
    todos: Array.from(Array(NUMBER_OF_TODOS).keys()).map((index) => {
      return {
        completed: index % 2 === 0 ? true : false,
        id: index.toString(),
        value: `TODO item no. ${index}`,
      };
    }),
  };
  const todoToBeAdded = { completed: false, id: uuid(), value: "Added TODO" };

  expect(reducer(previousState, add(todoToBeAdded))).toEqual({
    todos: [...previousState.todos, todoToBeAdded],
  });
});
