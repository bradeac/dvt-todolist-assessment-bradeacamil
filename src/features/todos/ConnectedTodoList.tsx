import { useSelector } from "react-redux";

import { check, remove } from "./todoListSlice";
import { RootState } from "../../app/store";
import { TodoList } from "../../components/TodoList";
import { useAppDispatch } from "../../app/store";

export const ConnectedTodoList = () => {
  const dispatch = useAppDispatch();
  const { todos } = useSelector((state: RootState) => state.todos);

  const handleCheck = (id: string) => {
    dispatch(check({ id }));
  };

  const handleDelete = (id: string) => {
    dispatch(remove({ id }));
  };

  return (
    <TodoList
      todos={todos}
      onItemCheck={handleCheck}
      onItemDelete={handleDelete}
    />
  );
};
