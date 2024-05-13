import "@testing-library/jest-dom";
import { expect, test, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";

import { AddTodoForm } from "../../components/AddTodoForm";

const mockOnAdd = vi.fn();

test("Expect component to be rendered", async () => {
  render(<AddTodoForm onAdd={mockOnAdd} />);

  expect(
    screen.getByRole("form", { name: "add to do form" })
  ).toBeInTheDocument();
});

test("Expect TODO text input to be rendered", async () => {
  render(<AddTodoForm onAdd={mockOnAdd} />);

  expect(
    screen.getByRole("textbox", { name: "to do text input" })
  ).toBeInTheDocument();
});

test("Expect add TODO button to be rendered", async () => {
  render(<AddTodoForm onAdd={mockOnAdd} />);

  expect(
    screen.getByRole("button", { name: "add to do button" })
  ).toBeInTheDocument();
});

test("Expect to be able to write a TODO into the add todo text input", async () => {
  render(<AddTodoForm onAdd={mockOnAdd} />);

  const input = screen.getByRole("textbox", { name: "to do text input" });

  fireEvent.change(input, { target: { value: "TODO item" } });

  expect(input).toHaveValue("TODO item");
});

test("Expect add TODO button to be disabled by default", async () => {
  render(<AddTodoForm onAdd={mockOnAdd} />);

  expect(
    screen.getByRole("button", { name: "add to do button" })
  ).toBeDisabled();
});

test("Expect add TODO button to be enabled when the TODO text input is populated with a value", async () => {
  render(<AddTodoForm onAdd={mockOnAdd} />);

  const input = screen.getByRole("textbox", { name: "to do text input" });

  fireEvent.change(input, { target: { value: "TODO item" } });

  expect(
    screen.getByRole("button", { name: "add to do button" })
  ).toBeEnabled();
});
