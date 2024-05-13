import { fireEvent, screen } from "@testing-library/react";

import { add } from "../../features/todos/todoListSlice";
import { ConnectedTodoList } from "../../features/todos/ConnectedTodoList";
import { renderWithProviders } from "../redux-test-utils";
import { setupStore } from "../../app/store";

const NUMBER_OF_TODOS = 10;

test("Expect ConnectedTodoList to be connected to Redux store and display TODOs", async () => {
  const store = setupStore();
  Array.from(Array(NUMBER_OF_TODOS).keys()).forEach((index) => {
    store.dispatch(
      add({
        completed: index % 2 === 0 ? true : false,
        id: index.toString(),
        value: `Todo item no. ${index}`,
      })
    );
  });

  renderWithProviders(<ConnectedTodoList />, { store });

  const todosListSection = screen.getByRole("region", {
    name: "to do list section",
  });

  expect(todosListSection).toBeInTheDocument();
  expect(todosListSection.children).toHaveLength(NUMBER_OF_TODOS);
});

test("Expect to check a TODO from the store and change its completed state", async () => {
  const store = setupStore();
  const NUMBER_OF_TODOS = 10;

  Array.from(Array(NUMBER_OF_TODOS).keys()).forEach((index) => {
    store.dispatch(
      add({
        completed: index % 2 === 0 ? true : false,
        id: index.toString(),
        value: `Initial TODO item no. ${index}`,
      })
    );
  });

  renderWithProviders(<ConnectedTodoList />, { store });

  const checkboxes = screen.getAllByRole("checkbox", {
    name: "to do checkbox",
  });

  fireEvent.click(checkboxes[6]); // initially this TODO has completed: true
  fireEvent.click(checkboxes[9]); // initially this TODO has completed: false

  const { todos } = store.getState().todos;

  expect(todos[6].completed).toBeFalsy();
  expect(todos[9].completed).toBeTruthy();
});

test("Expect to click on the Delete button of a TODO and the TODO will be deleted from the store", async () => {
  const store = setupStore();
  const NUMBER_OF_TODOS = 10;
  const TODO_TO_BE_DELETED_INDEX = 6;

  Array.from(Array(NUMBER_OF_TODOS).keys()).forEach((index) => {
    store.dispatch(
      add({
        completed: index % 2 === 0 ? true : false,
        id: index.toString(),
        value: `TODO item no. ${index}`,
      })
    );
  });

  renderWithProviders(<ConnectedTodoList />, { store });

  const deleteButtons = screen.getAllByRole("button", {
    name: "to do delete button",
  });
  const deletedToDoValue = `TODO item no. ${TODO_TO_BE_DELETED_INDEX}`;

  fireEvent.click(deleteButtons[TODO_TO_BE_DELETED_INDEX]);

  const { todos } = store.getState().todos;

  expect(todos).toHaveLength(NUMBER_OF_TODOS - 1);
  expect(screen.queryByText(deletedToDoValue)).not.toBeInTheDocument();
});
