import { v4 as uuid } from "uuid";
import React, { ChangeEvent, FormEvent, useState } from "react";

import { Todo } from "../types/Todo.type";

type AddTodoFormProps = {
  onAdd: (todo: Todo) => void;
};

export const AddTodoForm = ({ onAdd }: AddTodoFormProps) => {
  const [inputValue, setInputValue] = useState<string>("");

  const handleAdd = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!inputValue) return;

    onAdd({ completed: false, id: uuid(), value: inputValue });
    setInputValue("");
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    setInputValue(value);
  };

  return (
    <form aria-label="add todo form" className="mb-16" onSubmit={handleAdd}>
      <section className="flex items-center gap-4">
        <label htmlFor="todotextinput">I need to do:</label>
        <input
          aria-label="todo text input"
          id="todotextinput"
          name="TODO text input"
          value={inputValue}
          onChange={handleInputChange}
        />
        <button
          aria-label="add todo button"
          disabled={!inputValue}
          type="submit"
        >
          Add
        </button>
      </section>
    </form>
  );
};
