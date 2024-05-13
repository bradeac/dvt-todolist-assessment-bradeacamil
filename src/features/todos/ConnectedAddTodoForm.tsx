import { v4 as uuid } from "uuid";

import { AddTodoForm } from "../../components/AddTodoForm";
import { add } from "./todoListSlice";
import { useAppDispatch } from "../../app/store";

export const ConnectedAddTodoForm = () => {
  const dispatch = useAppDispatch();

  const handleAdd = (value: string) => {
    dispatch(add({ completed: false, id: uuid(), value }));
  };

  return <AddTodoForm onAdd={handleAdd} />;
};
