// eslint-disable-next-line import/prefer-default-export
export function difference(setA, setB) {
  const result = new Set(setA);
  // eslint-disable-next-line no-restricted-syntax
  for (const elem of setB) {
    result.delete(elem);
  }
  return result;
}
