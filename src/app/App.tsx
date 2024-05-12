import { ConnectedAddTodoForm as AddToDoForm } from "../features/todos/ConnectedAddTodoForm";
import { ConnectedTodoList as TodoList } from "../features/todos/ConnectedTodoList";

import "./App.css";

function App() {
  return (
    <main>
      <h1 className="mb-16">TODO List</h1>
      <AddToDoForm />
      <TodoList />
    </main>
  );
}

export default App;
