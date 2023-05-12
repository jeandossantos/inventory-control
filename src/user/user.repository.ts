import { Injectable } from '@nestjs/common';
import {
  CreateUserData,
  IUser,
  PaginatedUser,
  UpdateUserData,
  getUsersData,
} from './types/user.interface';
import { PrismaService } from '../prisma/prisma.service';

export abstract class AbstractUserRepository {
  abstract getById(id: string): Promise<IUser>;
  abstract getByEmail(email: string): Promise<IUser>;
  abstract create(user: CreateUserData): Promise<void>;
  abstract update(id: string, user: UpdateUserData): Promise<void>;
  abstract softDelete(id: string): Promise<void>;
  abstract getAll(data: getUsersData): Promise<PaginatedUser[]>;
}

@Injectable()
export default class UserRepository extends AbstractUserRepository {
  constructor(private prisma: PrismaService) {
    super();
  }

  getAll(data: getUsersData): Promise<PaginatedUser[]> {
    throw new Error('Method not implemented.');
  }
  softDelete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async update(id: string, user: UpdateUserData): Promise<void> {
    await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        ...user,
      },
    });
  }

  getById(id: string): Promise<IUser> {
    throw new Error('Method not implemented.');
  }

  async getByEmail(email: string): Promise<IUser> {
    return await this.prisma.user.findFirst({
      where: {
        email,
      },
    });
  }

  async create(data: CreateUserData): Promise<void> {
    await this.prisma.user.create({
      data,
    });
  }
}
