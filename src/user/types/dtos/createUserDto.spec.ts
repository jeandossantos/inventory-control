import { validate } from 'class-validator';
import { CreateUserDto } from './createUserDto';

describe('CreateUserDto', () => {
  it('should pass validation with correct input data', async () => {
    const data = {
      name: 'Alice',
      email: 'alice@example.com',
      password: 'password123',
      confirmedPassword: 'password123',
      isAdmin: false,
    };

    const user = new CreateUserDto();
    Object.assign(user, data);

    const errors = await validate(user);
    expect(errors.length).toBe(0);
  });

  it('should fail if name is empty', async () => {
    const data = {
      name: '',
      email: 'alice@example.com',
      password: 'password123',
      confirmedPassword: 'password123',
      isAdmin: false,
    };

    const user = new CreateUserDto();
    Object.assign(user, data);

    const errors = await validate(user);
    expect(errors.length).toBeGreaterThan(0);
  });

  it('should fail if email is not valid', async () => {
    const data = {
      name: 'Alice',
      email: 'invalid-email',
      password: 'password123',
      confirmedPassword: 'password123',
      isAdmin: false,
    };

    const user = new CreateUserDto();
    Object.assign(user, data);

    const errors = await validate(user);
    expect(errors.length).toBeGreaterThan(0);
  });

  it('should fail if password length is less than 8 characters', async () => {
    const data = {
      name: 'Alice',
      email: 'alice@example.com',
      password: '1234567',
      confirmedPassword: '1234567',
      isAdmin: false,
    };

    const user = new CreateUserDto();
    Object.assign(user, data);

    const errors = await validate(user);
    expect(errors.length).toBeGreaterThan(0);
  });

  it('should fail if isAdmin is not a boolean', async () => {
    const data = {
      name: 'Alice',
      email: 'alice@example.com',
      password: 'password123',
      confirmedPassword: 'password123',
      isAdmin: 'not-a-boolean',
    };

    const user = new CreateUserDto();
    Object.assign(user, data);

    const errors = await validate(user);
    expect(errors.length).toBeGreaterThan(0);
  });
});
