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
      aria-label="todo item"
      className="flex items-center justify-between mb-2"
    >
      <div className="max-w-60 text-left">
        {/* <div className="flex flex-1 gap-2"> */}
        <input
          aria-label="todo checkbox"
          checked={todo.completed}
          className="mr-4"
          id={todo.id}
          onChange={() => onCheck(todo.id)}
          type="checkbox"
        />
        <label
          aria-label="todo text"
          // className={cn("text-center text", {
          //   "text-checked": todo.completed,
          // })}
          className={cn("max-w-60 text-left todo-text", {
            "todo-text-active": todo.completed,
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
