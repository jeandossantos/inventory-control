import { Injectable } from '@nestjs/common';
import {
  CreateUserData,
  IUser,
  PaginatedUser,
  UpdateUserData,
  getUsersData,
} from './types/user.interface';

interface IUserRepository {
  getById(id: string): Promise<IUser>;
  getByEmail(email: string): Promise<IUser>;
  create(user: CreateUserData): Promise<void>;
  update(id: string, user: UpdateUserData): Promise<void>;
  softDelete(id: string): Promise<void>;
  getAll(data: getUsersData): Promise<PaginatedUser[]>;
}

@Injectable()
export default class UserRepository implements IUserRepository {
  getAll(data: getUsersData): Promise<PaginatedUser[]> {
    throw new Error('Method not implemented.');
  }
  softDelete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  update(id: string, user: UpdateUserData): Promise<void> {
    throw new Error('Method not implemented.');
  }
  getById(id: string): Promise<IUser> {
    throw new Error('Method not implemented.');
  }

  getByEmail(email: string): Promise<IUser> {
    throw new Error('Method not implemented.');
  }
  create(user: CreateUserData): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
