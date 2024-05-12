import cn from "classnames";
import { ChangeEvent, FormEvent, useState } from "react";
import { useSelector } from "react-redux";
import { v4 as uuid } from "uuid";

import { add, check, remove } from "./todoListSlice";
import { RootState, useAppDispatch } from "./store";

import "./App.css";

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

  const handleCheck = (id: string, completed: boolean) => {
    dispatch(check({ id, completed }));
  };

  const handleDelete = (id: string) => {
    dispatch(remove(id));
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
          <article
            className="flex items-center justify-between mb-2"
            key={todo.id}
          >
            <div className="flex flex-1 gap-2">
              <input
                checked={todo.completed}
                id={todo.id}
                onChange={() => handleCheck(todo.id, todo.completed)}
                type="checkbox"
              />
              <label
                className={cn("max-w-60 text-left", {
                  "line-through": todo.completed,
                })}
                htmlFor={todo.id}
              >
                {todo.value}
              </label>
            </div>
            <button onClick={() => handleDelete(todo.id)}>Delete</button>
          </article>
        ))}
      </section>
    </main>
  );
}

export default App;
