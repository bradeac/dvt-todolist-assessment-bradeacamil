import cn from "classnames";

import { Todo } from "../types/Todo.type";

import "./TodoItem.css";

type TodoItemProps = {
  onCheck: (id: string) => void;
  onDelete: (id: string) => void;
  todo: Todo;
};

export const TodoItem = ({ todo, onCheck, onDelete }: TodoItemProps) => {
  return (
    <article
      aria-label="to do item"
      className="flex items-center justify-between gap-8 px-4 mb-2 max-[400px]:items-stretch max-[400px]:flex-col max-[400px]:mb-8 max-[400px]:gap-2"
    >
      <div className="max-w-60 text-left">
        <input
          aria-label="to do checkbox"
          checked={todo.completed}
          className="mr-4"
          id={todo.id}
          onChange={() => onCheck(todo.id)}
          type="checkbox"
        />
        <label
          aria-label="to do text"
          className={cn("break-word max-w-60 text-left todo-text", {
            "todo-text-active": todo.completed,
          })}
          htmlFor={todo.id}
        >
          {todo.value}
        </label>
      </div>
      <button
        aria-label="to do delete button"
        className="whitespace-nowrap"
        onClick={() => onDelete(todo.id)}
      >
        Delete
      </button>
    </article>
  );
};
