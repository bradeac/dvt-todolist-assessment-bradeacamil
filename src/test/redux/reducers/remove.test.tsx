import reducer, {
  remove,
  TodosState,
} from "../../../features/todos/todoListSlice";
import generateMockTodos from "../../../utils/generateMockTodos";
import { generateRandomNumber } from "../../../utils/generateRandomNumbers";

const NUMBER_OF_TODOS = 10;

test("Call remove reducer with a TODO id and expect TODO to be removed from the store", () => {
  const toBeDeletedTodoIndex = generateRandomNumber(0, NUMBER_OF_TODOS);
  const initialState: TodosState = {
    todos: generateMockTodos(NUMBER_OF_TODOS),
  };

  // expect the store to be equal with the initialState without
  // the element on toBeDeletedTodoIndex
  const expectedState: TodosState = {
    todos: [
      ...initialState.todos.slice(0, toBeDeletedTodoIndex),
      ...initialState.todos.slice(
        toBeDeletedTodoIndex + 1,
        initialState.todos.length
      ),
    ],
  };

  expect(
    reducer(initialState, remove({ id: toBeDeletedTodoIndex.toString() }))
  ).toEqual(expectedState);
});
