import reducer from "../../features/todos/todoListSlice";

test("Expect to return the initial state of the store", () => {
  expect(reducer(undefined, { type: "unknown" })).toEqual({ todos: [] });
});
