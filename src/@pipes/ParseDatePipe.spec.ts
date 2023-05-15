import { ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { ParseDatePipe } from './ParseDatePipe';

describe('ParseDatePipe', () => {
  let pipe: ParseDatePipe;

  beforeEach(() => {
    pipe = new ParseDatePipe();
  });

  describe('transform', () => {
    it('should return null if value is falsy', () => {
      const result = pipe.transform(null, {} as ArgumentMetadata);
      expect(result).toBeNull();
    });

    it('should return a Date object if value is a valid date string', () => {
      const result = pipe.transform('2022-05-20', {} as ArgumentMetadata);
      expect(result).toEqual(new Date('2022-05-20'));
    });

    it('should throw a BadRequestException if value is an invalid date string', () => {
      expect(() => {
        pipe.transform('invalid-date', {} as ArgumentMetadata);
      }).toThrowError(BadRequestException);
    });
  });
});
