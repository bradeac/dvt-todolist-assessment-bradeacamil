import { Todo } from "../types/Todo.type";

export default function generateMockTodos(count: number): Todo[] {
  return Array.from(Array(count).keys()).map((index) => {
    return {
      completed: index % 2 === 0 ? true : false,
      id: index.toString(),
      value: `TODO item no. ${index}`,
    };
  });
}
