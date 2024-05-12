import cn from "classnames";

import { Todo } from "../types/Todo.type";

type TodoItemProps = {
  onCheck: (id: string) => void;
  onDelete: (id: string) => void;
  todo: Todo;
};

export const TodoItem = ({ todo, onCheck, onDelete }: TodoItemProps) => {
  return (
    <article
      aria-label="todo item"
      className="flex items-center justify-between mb-2"
    >
      <div className="flex flex-1 gap-2">
        <input
          aria-label="todo checkbox"
          checked={todo.completed}
          id={todo.id}
          onChange={() => onCheck(todo.id)}
          type="checkbox"
        />
        <label
          aria-label="todo text"
          className={cn("max-w-60 text-left", {
            "line-through": todo.completed,
          })}
          htmlFor={todo.id}
        >
          {todo.value}
        </label>
      </div>
      <button aria-label="todo delete button" onClick={() => onDelete(todo.id)}>
        Delete
      </button>
    </article>
  );
};
