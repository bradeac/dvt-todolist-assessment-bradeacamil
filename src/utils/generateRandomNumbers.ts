export function generateRandomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function generateRandomEvenNumber(min: number, max: number): number {
  const number = Math.floor(Math.random() * (max - min + 1) + min);

  if (number % 2 === 0) return number;

  return generateRandomEvenNumber(min, max);
}

export function generateRandomOddNumber(min: number, max: number): number {
  const number = Math.floor(Math.random() * (max - min + 1) + min);

  if (number % 2 !== 0) return number;

  return generateRandomOddNumber(min, max);
}
