import cn from "classnames";

import { check, remove } from "../features/todos/todoListSlice";
import { useAppDispatch } from "../app/store";
import { Todo } from "../types/Todo.type";

import "./TodoItem.css";

type TodoItemProps = {
  todo: Todo;
};

export const TodoItem = ({ todo }: TodoItemProps) => {
  const dispatch = useAppDispatch();

  const handleCheck = (id: string, completed: boolean) => {
    dispatch(check({ id, completed }));
  };

  const handleDelete = (id: string) => {
    dispatch(remove(id));
  };

  return (
    <article className="flex items-center justify-between mb-2" key={todo.id}>
      <div className="max-w-60 text-left">
        {/* <div className="flex flex-1 gap-2"> */}
        <input
          checked={todo.completed}
          className="mr-4"
          id={todo.id}
          onChange={() => handleCheck(todo.id, todo.completed)}
          type="checkbox"
        />
        <label
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
      <button onClick={() => handleDelete(todo.id)}>Delete</button>
    </article>
  );
};
