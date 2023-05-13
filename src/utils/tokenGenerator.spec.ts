import { JwtService } from '@nestjs/jwt';
import { tokenGenerator } from './tokenGenerator';
import { CreateUserData } from '../user/types/user.interface';
import { SECRET } from './constants';

describe('tokenGenerator', () => {
  const userMock: CreateUserData = {
    name: 'John Smith',
    email: 'email@address.com',
    password: 'Password123',
    isAdmin: true,
  };

  it('should generate a valid JWT token', async () => {
    const jwtService = new JwtService({
      secret: 'testSecret',
    });

    const token = await tokenGenerator(userMock);
    expect(typeof token).toBe('string');
    expect(token).toMatch(/^Bearer\s/);

    const decodedToken = await new JwtService({ secret: SECRET }).verifyAsync(
      token.replace(/^Bearer\s/, ''),
    );

    expect(decodedToken).toMatchObject(userMock);
  });
});
