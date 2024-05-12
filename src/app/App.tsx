import { useSelector } from "react-redux";

import { TodoList } from "../components/TodoList";
import { RootState } from "./store";

import "./App.css";
import { AddTodoForm } from "../components/AddTodoForm";

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
