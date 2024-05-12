import { Todo } from "../types/Todo.type";
import { TodoItem } from "./TodoItem";

type TodoListProps = {
  todos: Todo[];
};

export const TodoList = ({ todos }: TodoListProps) => (
  <section className="max-h-[60vh] overflow-y-scroll">
    {todos.map((todo) => (
      <TodoItem todo={todo} />
    ))}
  </section>
);
