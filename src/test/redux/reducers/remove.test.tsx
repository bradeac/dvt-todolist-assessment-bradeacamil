import reducer, {
  remove,
  TodosState,
} from "../../../features/todos/todoListSlice";

const NUMBER_OF_TODOS = 10;

test("Call remove reducer with a TODO id and expect TODO to be removed from the store", () => {
  const previousState: TodosState = {
    todos: Array.from(Array(NUMBER_OF_TODOS).keys()).map((index) => {
      return {
        completed: index % 2 === 0 ? true : false,
        id: index.toString(),
        value: `TODO item no. ${index}`,
      };
    }),
  };
  const toBeDeletedTodoIndex = 6;

  // expect the store to be equal with the previousState without the element on toBeDeletedTodoIndex
  expect(
    reducer(previousState, remove({ id: toBeDeletedTodoIndex.toString() }))
  ).toEqual({
    todos: [
      ...previousState.todos.slice(0, toBeDeletedTodoIndex),
      ...previousState.todos.slice(
        toBeDeletedTodoIndex + 1,
        previousState.todos.length
      ),
    ],
  });
});
