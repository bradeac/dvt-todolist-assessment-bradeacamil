import { TodoItem } from "../components/TodoItem";
import { Todo } from "../types/Todo.type";

type TodoListProps = {
  todos: Todo[];
  onItemCheck: (id: string) => void;
  onItemDelete: (id: string) => void;
};

export const TodoList = ({
  todos,
  onItemCheck,
  onItemDelete,
}: TodoListProps) => (
  <section
    aria-label="to do list section"
    className="max-h-[50vh] overflow-y-scroll"
  >
    {todos.map((todo) => (
      <TodoItem
        key={todo.id}
        todo={todo}
        onCheck={onItemCheck}
        onDelete={onItemDelete}
      />
    ))}
  </section>
);
