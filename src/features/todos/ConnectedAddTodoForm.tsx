import { AddTodoForm } from "../../components/AddTodoForm";
import { add } from "./todoListSlice";
import { useAppDispatch } from "../../app/store";
import { Todo } from "../../types/Todo.type";

export const ConnectedAddTodoForm = () => {
  const dispatch = useAppDispatch();

  const handleAdd = (todo: Todo) => {
    dispatch(add(todo));
  };

  return <AddTodoForm onAdd={handleAdd} />;
};
