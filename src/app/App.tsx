import { ChangeEvent, FormEvent, useState } from "react";
import { useSelector } from "react-redux";
import { v4 as uuid } from "uuid";

import { add } from "../features/todos/todoListSlice";
import { RootState, useAppDispatch } from "./store";

import "./App.css";
import { TodoItem } from "../components/TodoItem";

function App() {
  const dispatch = useAppDispatch();
  const { todos } = useSelector((state: RootState) => state.todos);
  const [inputValue, setInputValue] = useState<string>("");

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    setInputValue(value);
  };

  const handleAdd = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!inputValue) return;

    dispatch(add({ completed: false, id: uuid(), value: inputValue }));
    setInputValue("");
  };

  return (
    <main>
      <h1 className="mb-16">TODO List</h1>
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
      <section className="max-h-[60vh] overflow-y-scroll">
        {todos.map((todo) => (
          <TodoItem todo={todo} />
        ))}
      </section>
    </main>
  );
}

export default App;
