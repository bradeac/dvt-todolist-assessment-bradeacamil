import { ChangeEvent, FormEvent, useState } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>("");

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    setInputValue(value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!inputValue) return;

    setTodos([...todos, inputValue]);
    setInputValue("");
  };

  const handleDelete = (todoToDelete: string) => {
    setTodos(todos.filter((todo) => todo !== todoToDelete));
  };

  return (
    <main>
      <h1 className="mb-16">TODO List</h1>
      <form className="mb-16" onSubmit={handleSubmit}>
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
            key={todo}
          >
            <div className="flex gap-2">
              <input id={todo} type="checkbox" />
              <label htmlFor={todo}>{todo}</label>
            </div>
            <button onClick={() => handleDelete(todo)}>Delete</button>
          </article>
        ))}
      </section>
    </main>
  );
}

export default App;
