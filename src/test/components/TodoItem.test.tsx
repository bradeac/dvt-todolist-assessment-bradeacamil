import "@testing-library/jest-dom";
import { expect, test, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";

import { v4 as uuid } from "uuid";

import { TodoItem } from "../../components/TodoItem";

const TODO_ID = uuid();

const mock = {
  completed: false,
  id: TODO_ID,
  value: "Todo item",
};

const mockOnCheck = vi.fn();
const mockOnDelete = vi.fn();

test("Expect component to be rendered", async () => {
  render(
    <TodoItem todo={mock} onCheck={mockOnCheck} onDelete={mockOnDelete} />
  );

  expect(screen.getByRole("article")).toBeInTheDocument();
});

test("Expect TODO checkbox to be rendered", async () => {
  render(
    <TodoItem todo={mock} onCheck={mockOnCheck} onDelete={mockOnDelete} />
  );

  expect(
    screen.getByRole("checkbox", { name: "to do checkbox" })
  ).toBeInTheDocument();
});

test("Expect TODO text to be rendered", async () => {
  render(
    <TodoItem todo={mock} onCheck={mockOnCheck} onDelete={mockOnDelete} />
  );

  expect(screen.getByLabelText(mock.value)).toBeInTheDocument();
});

test("Expect TODO delete button to be rendered", async () => {
  render(
    <TodoItem todo={mock} onCheck={mockOnCheck} onDelete={mockOnDelete} />
  );

  expect(
    screen.getByRole("button", { name: "to do delete button" })
  ).toBeInTheDocument();
});

test("Expect uncompleted TODO to be rendered as unchecked", async () => {
  render(
    <TodoItem todo={mock} onCheck={mockOnCheck} onDelete={mockOnDelete} />
  );

  expect(screen.getByRole("checkbox")).not.toBeChecked();
});

test("Expect completed TODO to be rendered as checked", async () => {
  render(
    <TodoItem
      todo={{
        ...mock,
        completed: true,
      }}
      onCheck={mockOnCheck}
      onDelete={mockOnDelete}
    />
  );

  expect(screen.getByRole("checkbox")).toBeChecked();
});

test("Expect uncompleted TODO to be rendered without text-decoration: line-through", async () => {
  render(
    <TodoItem todo={mock} onCheck={mockOnCheck} onDelete={mockOnDelete} />
  );

  expect(screen.getByText(mock.value)).not.toHaveClass("line-through");
});

test("Expect completed TODO to be rendered with text-decoration: line-through", async () => {
  render(
    <TodoItem
      todo={{
        ...mock,
        completed: true,
      }}
      onCheck={mockOnCheck}
      onDelete={mockOnDelete}
    />
  );

  expect(screen.getByText(mock.value)).toHaveClass("line-through");
});

test("Expect onCheck to be called when clicking on a TODO checkbox", async () => {
  render(
    <TodoItem todo={mock} onCheck={mockOnCheck} onDelete={mockOnDelete} />
  );

  const checkbox = screen.getByRole("checkbox");

  fireEvent.click(checkbox);

  expect(mockOnCheck).toHaveBeenCalled();
});

test("Expect onCheck to be called when clicking on a TODO text", async () => {
  render(
    <TodoItem todo={mock} onCheck={mockOnCheck} onDelete={mockOnDelete} />
  );

  const text = screen.getByText(mock.value);

  fireEvent.click(text);

  expect(mockOnCheck).toHaveBeenCalled();
});

test("Expect onDelete to be called when clicking on a TODO delete button", async () => {
  render(
    <TodoItem todo={mock} onCheck={mockOnCheck} onDelete={mockOnDelete} />
  );

  const button = screen.getByRole("button", { name: "to do delete button" });

  fireEvent.click(button);

  expect(mockOnDelete).toHaveBeenCalled();
});
