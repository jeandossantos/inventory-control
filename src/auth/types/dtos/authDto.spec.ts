import { validate } from 'class-validator';
import { AuthDto } from './authDto';

describe('AuthDto', () => {
  it('should validate a valid auth dto successfully', async () => {
    const authDto = new AuthDto();
    authDto.email = 'johndoe@example.com';
    authDto.password = 'testpassword';

    const validationErrors = await validate(authDto);

    expect(validationErrors.length).toBe(0);
  });

  it('should fail to validate a dto with an invalid email field', async () => {
    const authDto = new AuthDto();
    authDto.email = 'johndoe';
    authDto.password = 'testpassword';

    const validationErrors = await validate(authDto);

    expect(validationErrors.length).toBeGreaterThan(0);
    expect(validationErrors[0].constraints).toMatchObject({
      isEmail: 'email must be an email',
    });
  });

  it('should fail to validate a dto with a too short password', async () => {
    const authDto = new AuthDto();
    authDto.email = 'johndoe@example.com';
    authDto.password = 'shortpw';

    const validationErrors = await validate(authDto);

    expect(validationErrors.length).toBeGreaterThan(0);
    expect(validationErrors[0].constraints).toMatchObject({
      minLength: 'password must be longer than or equal to 8 characters',
    });
  });
});
