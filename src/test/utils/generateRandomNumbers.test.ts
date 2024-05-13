import {
  generateRandomEvenNumber,
  generateRandomNumber,
  generateRandomOddNumber,
} from "../../utils/generateRandomNumbers";

const MIN = 0;
const MAX = 10;

test("Expect function to generate the correct number of TODOs", () => {
  const randomNumber = generateRandomNumber(MIN, MAX);
  const randomEvenNumber = generateRandomEvenNumber(MIN, MAX);
  const randomOddNumber = generateRandomOddNumber(MIN, MAX);

  expect(randomNumber).toBeTypeOf("number");
  expect(randomNumber).toBeLessThanOrEqual(MAX);
  expect(randomNumber).toBeGreaterThanOrEqual(MIN);

  expect(randomEvenNumber).toBeTypeOf("number");
  expect(randomEvenNumber).toBeLessThanOrEqual(MAX);
  expect(randomEvenNumber).toBeGreaterThanOrEqual(MIN);
  expect(randomEvenNumber % 2).toBe(0);

  expect(randomOddNumber).toBeTypeOf("number");
  expect(randomOddNumber).toBeLessThanOrEqual(MAX);
  expect(randomOddNumber).toBeGreaterThanOrEqual(MIN);
  expect(randomOddNumber % 2).not.toBe(0);
});
