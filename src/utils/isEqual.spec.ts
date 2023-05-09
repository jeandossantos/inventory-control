import { isEqual } from './isEqual';

describe('isEqual', () => {
  it('should return true if the two primitive values are equal', () => {
    expect(isEqual(1, 1)).toBe(true);
    expect(isEqual('hello', 'hello')).toBe(true);
    expect(isEqual(false, false)).toBe(true);
  });

  it('should return false if the two primitive values are not equal', () => {
    expect(isEqual(1, 2)).toBe(false);
    expect(isEqual('hello', 'world')).toBe(false);
    expect(isEqual(true, false)).toBe(false);
  });
});
