import { SECRET } from './../utils/constants';
import { AbstractUserRepository } from '../user/user.repository';
import { AuthService } from './auth.service';
import { UnauthorizedException } from '@nestjs/common';

import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

describe('AuthService', () => {
  const credentialsMock = {
    email: 'test@example.com',
    password: 'test123456',
  };

  const userRepositoryMock: AbstractUserRepository = {
    create: jest.fn(),
    getByEmail: jest.fn(),
    getById: jest.fn(),
    update: jest.fn(),
    softDelete: jest.fn(),
    getAll: jest.fn(),
  };

  const jwtService = new JwtService({
    secret: SECRET,
  });

  describe('#Authenticate', () => {
    test('should not authenticate if user does not exist', async () => {
      userRepositoryMock.getByEmail = jest.fn().mockResolvedValue(undefined);

      const service = new AuthService(userRepositoryMock, jwtService);

      await expect(service.authenticate(credentialsMock)).rejects.toThrow(
        new UnauthorizedException('E-mail/Password invalid(s)!'),
      );

      expect(userRepositoryMock.getByEmail).toHaveBeenCalled();
    });

    test('should not authenticate passwords noes not match', async () => {
      userRepositoryMock.getByEmail = jest
        .fn()
        .mockResolvedValue(credentialsMock);

      const service = new AuthService(userRepositoryMock, jwtService);

      jest
        .spyOn(bcrypt, 'compare')
        .mockImplementation(() => Promise.resolve(false));

      await expect(service.authenticate(credentialsMock)).rejects.toThrow(
        new UnauthorizedException('E-mail/Password invalid(s)!'),
      );

      expect(userRepositoryMock.getByEmail).toHaveBeenCalled();
      expect(bcrypt.compare).toHaveBeenCalled();
    });

    test('should authenticate with valid credentials', async () => {
      userRepositoryMock.getByEmail = jest
        .fn()
        .mockResolvedValue(credentialsMock);

      jest.spyOn(jwtService, 'signAsync');

      const service = new AuthService(userRepositoryMock, jwtService);

      jest
        .spyOn(bcrypt, 'compare')
        .mockImplementation(() => Promise.resolve(true));

      const result = await service.authenticate(credentialsMock);

      expect(userRepositoryMock.getByEmail).toHaveBeenCalled();
      expect(bcrypt.compare).toHaveBeenCalled();
      expect(jwtService.signAsync).toHaveBeenCalled();

      expect(result).toHaveProperty('access_token');
    });
  });
});
