import { ChangeEvent, FormEvent, useState } from "react";

type AddTodoFormProps = {
  onAdd: (todoText: string) => void;
};

export const AddTodoForm = ({ onAdd }: AddTodoFormProps) => {
  const [inputValue, setInputValue] = useState<string>("");

  const handleAdd = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!inputValue) return;

    onAdd(inputValue);
    setInputValue("");
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    setInputValue(value);
  };

  return (
    <form aria-label="add to do form" className="mb-16" onSubmit={handleAdd}>
      <section className="flex items-center gap-4">
        <label htmlFor="todotextinput">I need to do:</label>
        <input
          aria-label="to do text input"
          autoComplete="off"
          id="todotextinput"
          name="TODO text input"
          value={inputValue}
          onChange={handleInputChange}
        />
        <button
          aria-label="add to do button"
          disabled={!inputValue}
          type="submit"
        >
          Add
        </button>
      </section>
    </form>
  );
};
