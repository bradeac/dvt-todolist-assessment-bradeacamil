import { useSelector } from "react-redux";

import { AddTodoForm } from "../components/AddTodoForm";
import { TodoList } from "../components/TodoList";
import { RootState } from "./store";

import "./App.css";

function App() {
  const { todos } = useSelector((state: RootState) => state.todos);

  return (
    <main>
      <h1 className="mb-16">TODO List</h1>
      <AddTodoForm />
      <TodoList todos={todos} />
    </main>
  );
}

export default App;
