import generateMockTodos from "../../utils/generateMockTodos";

const NUMBER_OF_TODOS = 10;

test("Expect function to generate the correct number of TODOs", () => {
  const noTodos = generateMockTodos(0);
  const mockTodos = generateMockTodos(NUMBER_OF_TODOS);

  expect(noTodos).toHaveLength(0);
  expect(mockTodos).toHaveLength(10);
});
