import reducer, {
  check,
  TodosState,
} from "../../../features/todos/todoListSlice";

const NUMBER_OF_TODOS = 10;

test("Call check reducer with a TODO id and expect TODO completed attribute to be modified", () => {
  const previousState: TodosState = {
    todos: Array.from(Array(NUMBER_OF_TODOS).keys()).map((index) => {
      return {
        completed: index % 2 === 0 ? true : false,
        id: index.toString(),
        value: `TODO item no. ${index}`,
      };
    }),
  };
  const completedTodoIndex = 6;
  const uncompletedTodoIndex = 9;

  expect(
    reducer(previousState, check({ id: completedTodoIndex.toString() }))
  ).toEqual({
    todos: [
      ...previousState.todos.slice(0, completedTodoIndex),
      {
        // test if this completed TODO was modified into an uncompleted one
        completed: false,
        id: completedTodoIndex.toString(),
        value: `TODO item no. ${completedTodoIndex}`,
      },
      ...previousState.todos.slice(
        completedTodoIndex + 1,
        previousState.todos.length
      ),
    ],
  });

  expect(
    reducer(previousState, check({ id: uncompletedTodoIndex.toString() }))
  ).toEqual({
    todos: [
      ...previousState.todos.slice(0, uncompletedTodoIndex),
      {
        // test if this uncompleted TODO was modified into a completed one
        completed: true,
        id: uncompletedTodoIndex.toString(),
        value: `TODO item no. ${uncompletedTodoIndex}`,
      },
      ...previousState.todos.slice(
        uncompletedTodoIndex + 1,
        previousState.todos.length
      ),
    ],
  });
});
