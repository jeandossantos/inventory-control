import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { UpdateUserDto } from './updateUserDto';

describe('UpdateUserDto', () => {
  it('should validate a valid request object', async () => {
    const data = {
      name: 'John Doe',
      email: 'johndoe@example.com',
    };
    const dto = plainToClass(UpdateUserDto, data);
    const errors: ValidationError[] = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should fail if name is not provided', async () => {
    const data = {
      email: 'johndoe@example.com',
    };
    const dto = plainToClass(UpdateUserDto, data);
    const errors: ValidationError[] = await validate(dto);
    expect(errors.length).toBe(1);
    expect(errors[0].constraints).toHaveProperty('isNotEmpty');
    expect(errors[0].constraints.isNotEmpty).toBeDefined();
  });

  it('should fail if email is not provided', async () => {
    const data = {
      name: 'John Doe',
    };
    const dto = plainToClass(UpdateUserDto, data);
    const errors: ValidationError[] = await validate(dto);
    expect(errors.length).toBe(1);
    expect(errors[0].constraints).toHaveProperty('isNotEmpty');
    expect(errors[0].constraints.isNotEmpty).toBeDefined();
  });

  it('should fail if email is invalid', async () => {
    const data = {
      name: 'John Doe',
      email: 'invalid-email',
    };
    const dto = plainToClass(UpdateUserDto, data);
    const errors: ValidationError[] = await validate(dto);
    expect(errors.length).toBe(1);
    expect(errors[0].constraints).toHaveProperty('isEmail');
    expect(errors[0].constraints.isEmail).toBeDefined();
  });
});
