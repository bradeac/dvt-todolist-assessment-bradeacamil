import "@testing-library/jest-dom";
import { expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";

import { TodoList } from "../../components/TodoList";

const NUMBER_OF_TODOS = 10;

const mock = Array.from(Array(NUMBER_OF_TODOS).keys()).map((index) => {
  return {
    completed: index % 2 === 0 ? true : false,
    id: index.toString(),
    value: `Todo item no. ${index}`,
  };
});

const mockOnCheck = vi.fn();
const mockOnDelete = vi.fn();

test("Expect component to be rendered", async () => {
  render(
    <TodoList
      todos={mock}
      onItemCheck={mockOnCheck}
      onItemDelete={mockOnDelete}
    />
  );

  expect(
    screen.getByRole("region", { name: "to do list section" })
  ).toBeInTheDocument();
});

test("Expect component to render a list of TodoItem components with the correct length", async () => {
  render(
    <TodoList
      todos={mock}
      onItemCheck={mockOnCheck}
      onItemDelete={mockOnDelete}
    />
  );

  expect(screen.getAllByRole("article", { name: "to do item" })).toHaveLength(
    NUMBER_OF_TODOS
  );
});
