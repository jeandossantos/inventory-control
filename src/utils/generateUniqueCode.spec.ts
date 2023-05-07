import { generateUniqueCode } from './generateUniqueCode';

describe('generateUniqueCode', () => {
  it('should generate a string with 6 characters', () => {
    const code = generateUniqueCode();
    expect(code).toHaveLength(6); // Expects the generated code to have a length of 6
  });

  it('should generate a random unique code', () => {
    const code1 = generateUniqueCode(); // Generates a code
    const code2 = generateUniqueCode(); // Generates another code
    expect(code1).not.toEqual(code2); // Expects the two generated codes to be different
  });
});
