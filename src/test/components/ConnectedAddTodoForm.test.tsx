import { fireEvent, screen } from "@testing-library/react";

import { add } from "../../features/todos/todoListSlice";
import { ConnectedAddTodoForm } from "../../features/todos/ConnectedAddTodoForm";
import { renderWithProviders } from "../redux-test-utils";
import { setupStore } from "../../app/store";

test("Expect ConnectedAddTodoForm to be connected to Redux store and add a TODO to the empty store", async () => {
  const store = setupStore();
  renderWithProviders(<ConnectedAddTodoForm />, { store });

  const todoInput = screen.getByRole("textbox", { name: "to do text input" });
  const addTodoButton = screen.getByRole("button", {
    name: "add to do button",
  });

  fireEvent.change(todoInput, { target: { value: "TODO item" } });
  fireEvent.click(addTodoButton);

  const { todos } = store.getState().todos;

  expect(todos).toHaveLength(1);
  expect(todos[0].completed).toBeFalsy();
  expect(todos[0].value).toEqual("TODO item");
});

test("Expect ConnectedAddTodoForm to be connected to Redux store and add a TODO to a store of existing TODOs", async () => {
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

  renderWithProviders(<ConnectedAddTodoForm />, { store });

  const todoInput = screen.getByRole("textbox", { name: "to do text input" });
  const addTodoButton = screen.getByRole("button", {
    name: "add to do button",
  });

  fireEvent.change(todoInput, { target: { value: "Added TODO item" } });
  fireEvent.click(addTodoButton);

  const { todos } = store.getState().todos;

  expect(todos).toHaveLength(NUMBER_OF_TODOS + 1);
  expect(todos[todos.length - 1].value).toEqual("Added TODO item");
});
