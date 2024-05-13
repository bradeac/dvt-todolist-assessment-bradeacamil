import reducer, {
  check,
  TodosState,
} from "../../../features/todos/todoListSlice";
import generateMockTodos from "../../../utils/generateMockTodos";
import {
  generateRandomEvenNumber,
  generateRandomOddNumber,
} from "../../../utils/generateRandomNumbers";

const NUMBER_OF_TODOS = 10;

test("Call check reducer with a TODO id and expect TODO completed attribute to be modified", () => {
  const completedTodoIndex = generateRandomEvenNumber(0, NUMBER_OF_TODOS - 1);
  const uncompletedTodoIndex = generateRandomOddNumber(0, NUMBER_OF_TODOS - 1);

  const initialState: TodosState = {
    todos: generateMockTodos(NUMBER_OF_TODOS),
  };
  const expectedStateAfterCheckingCompletedTodo: TodosState = {
    todos: [
      ...initialState.todos.slice(0, completedTodoIndex),
      {
        // this completed TODO should be modified into an uncompleted one
        completed: false,
        id: completedTodoIndex.toString(),
        value: `TODO item no. ${completedTodoIndex}`,
      },
      ...initialState.todos.slice(
        completedTodoIndex + 1,
        initialState.todos.length
      ),
    ],
  };
  const expectedStateAfterCheckingUncompletedTodo: TodosState = {
    todos: [
      ...initialState.todos.slice(0, uncompletedTodoIndex),
      {
        // this uncompleted TODO should be modified into a completed one
        completed: true,
        id: uncompletedTodoIndex.toString(),
        value: `TODO item no. ${uncompletedTodoIndex}`,
      },
      ...initialState.todos.slice(
        uncompletedTodoIndex + 1,
        initialState.todos.length
      ),
    ],
  };

  expect(
    reducer(initialState, check({ id: completedTodoIndex.toString() }))
  ).toEqual(expectedStateAfterCheckingCompletedTodo);
  expect(
    reducer(initialState, check({ id: uncompletedTodoIndex.toString() }))
  ).toEqual(expectedStateAfterCheckingUncompletedTodo);
});
