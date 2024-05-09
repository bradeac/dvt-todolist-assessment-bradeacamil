import { ChangeEvent, FormEvent, useState } from "react";
import cn from "classnames";
import { v4 as uuid } from "uuid";

import "./App.css";

type Todo = {
  completed: boolean;
  id: string;
  value: string;
};

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState<string>("");

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    setInputValue(value);
  };

  const handleAdd = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!inputValue) return;

    setTodos([...todos, { completed: false, id: uuid(), value: inputValue }]);
    setInputValue("");
  };

  const handleCheck = (id: string, completed: boolean) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          completed: !completed,
          id: todo.id,
          value: todo.value,
        };
      }

      return todo;
    });

    setTodos(newTodos);
  };

  const handleDelete = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
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
                className={cn("w-full text-left", {
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
