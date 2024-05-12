import { v4 as uuid } from "uuid";
import { ChangeEvent, FormEvent, useState } from "react";

import { add } from "../features/todos/todoListSlice";
import { useAppDispatch } from "../app/store";

export const AddTodoForm = () => {
  const dispatch = useAppDispatch();
  const [inputValue, setInputValue] = useState<string>("");

  const handleAdd = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!inputValue) return;

    dispatch(add({ completed: false, id: uuid(), value: inputValue }));
    setInputValue("");
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    setInputValue(value);
  };

  return (
    <form className="mb-16" onSubmit={handleAdd}>
      <section className="flex items-center gap-4">
        <label htmlFor="todotextinput">I need to do:</label>
        <input
          id="todotextinput"
          name="TODO text input"
          value={inputValue}
          onChange={handleInputChange}
        />
        <button disabled={!inputValue} type="submit">
          Add
        </button>
      </section>
    </form>
  );
};
