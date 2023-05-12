import { BadRequestException } from '@nestjs/common';
import UserRepository from './user.repository';
import { UserService } from './user.service';
import * as isEqualModule from '../utils/isEqual';
import * as hashPasswordModule from '../utils/hashPassword';
import type { CreateUserDto } from './types/dtos/createUserDto';

describe('#UserService', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
    jest.resetAllMocks();
  });

  const userMock: CreateUserDto = {
    name: 'John Smith',
    email: 'email@address.com',
    password: 'Password123',
    confirmedPassword: 'Password123',
    isAdmin: true,
  };

  const userRepositoryMock: UserRepository = {
    create: jest.fn(),
    getByEmail: jest.fn(),
    getById: jest.fn(),
    update: jest.fn(),
    softDelete: jest.fn(),
    getAll: jest.fn(),
  };

  describe('#create user', () => {
    test('should not create if passwords does not match', async () => {
      jest.spyOn(isEqualModule, 'isEqual').mockReturnValue(false);

      const service = new UserService(userRepositoryMock);

      const result = service.create(userMock);

      expect(result).rejects.toThrow(
        new BadRequestException('Passwords does not match!'),
      );

      expect(isEqualModule.isEqual).toHaveBeenCalled();
      expect(userRepositoryMock.create).not.toHaveBeenCalled();
      expect(userRepositoryMock.getByEmail).not.toHaveBeenCalled();
    });

    test('should not create a user if user already exist', async () => {
      userRepositoryMock.getByEmail = jest.fn().mockReturnValue(userMock);

      jest.spyOn(isEqualModule, 'isEqual').mockReturnValue(true);

      const service = new UserService(userRepositoryMock);

      await expect(service.create(userMock)).rejects.toThrow(
        new BadRequestException('User already exists!'),
      );

      expect(isEqualModule.isEqual).toHaveBeenCalled();
      expect(userRepositoryMock.getByEmail).toHaveBeenCalled();
      expect(userRepositoryMock.create).not.toHaveBeenCalled();
    });

    test('should create a user with password hashed', async () => {
      userRepositoryMock.getByEmail = jest.fn().mockReturnValue(undefined);

      jest.spyOn(isEqualModule, 'isEqual').mockReturnValue(true);
      jest.spyOn(hashPasswordModule, 'hashPassword');

      const service = new UserService(userRepositoryMock);

      await service.create(userMock);

      expect(isEqualModule.isEqual).toHaveBeenCalled();
      expect(hashPasswordModule.hashPassword).toHaveBeenCalled();
      expect(userRepositoryMock.getByEmail).toHaveBeenCalled();
      expect(userRepositoryMock.create).toHaveBeenCalled();
    });
  });

  describe('#update user', () => {
    it('should not update an nonexistent user', async () => {
      userRepositoryMock.getById = jest.fn().mockReturnValue(undefined);

      const service = new UserService(userRepositoryMock);

      await expect(service.update('some-uuid', userMock)).rejects.toThrow(
        new BadRequestException('User not found!'),
      );

      expect(userRepositoryMock.getById).toHaveBeenCalled();
      expect(userRepositoryMock.update).not.toHaveBeenCalled();
    });

    it('should update user', async () => {
      userRepositoryMock.getById = jest.fn().mockReturnValue({});

      const service = new UserService(userRepositoryMock);
      await service.update('some-uuid', userMock);

      expect(userRepositoryMock.getById).toHaveBeenCalled();
      expect(userRepositoryMock.update).toHaveBeenCalled();
    });
  });

  describe('#soft delete user', () => {
    it('should not delete an nonexistent user', async () => {
      userRepositoryMock.getById = jest.fn().mockReturnValue(undefined);

      const service = new UserService(userRepositoryMock);

      await expect(service.delete('some-uuid')).rejects.toThrow(
        new BadRequestException('User not found!'),
      );

      expect(userRepositoryMock.getById).toHaveBeenCalled();
      expect(userRepositoryMock.softDelete).not.toHaveBeenCalled();
    });

    it('should soft delete a user', async () => {
      userRepositoryMock.getById = jest.fn().mockReturnValue({});

      const service = new UserService(userRepositoryMock);
      await service.delete('some-uuid');

      expect(userRepositoryMock.getById).toHaveBeenCalled();
      expect(userRepositoryMock.softDelete).toHaveBeenCalled();
    });
  });

  describe('list users', () => {
    test('should list all users', async () => {
      userRepositoryMock.getAll = jest
        .fn()
        .mockResolvedValue({ data: [userMock], count: 1, limit: 10 });

      const service = new UserService(userRepositoryMock);
      const result = await service.getAll();

      expect(userRepositoryMock.getAll).toHaveBeenCalled();
      expect(result).toHaveProperty('data');
      expect(result).toHaveProperty('count');
      expect(result).toHaveProperty('limit');
    });
  });
});
