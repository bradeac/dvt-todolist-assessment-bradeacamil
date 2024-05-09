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

  return (
    <main>
      <h1>TODO List</h1>
      <section>
        {todos.map((todo) => (
          <article key={todo}>
            <input id={todo} type="checkbox" />
            <label htmlFor={todo}>{todo}</label>
          </article>
        ))}
      </section>
      <form onSubmit={handleSubmit}>
        <section>
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
    </main>
  );
}

export default App;
