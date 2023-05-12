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
  abstract getAll(data: getUsersData): Promise<PaginatedUser>;
}

@Injectable()
export default class UserRepository extends AbstractUserRepository {
  constructor(private prisma: PrismaService) {
    super();
  }

  async getAll(data: getUsersData): Promise<PaginatedUser> {
    const { search, page } = data;
    const take = 10;
    const skip = (page - 1) * take;

    const count = await this.prisma.user.count({
      where: {
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { email: { contains: search, mode: 'insensitive' } },
        ],
      },
    });

    const users = await this.prisma.user.findMany({
      where: {
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { email: { contains: search, mode: 'insensitive' } },
        ],
      },
      take,
      skip,
    });

    return {
      data: users,
      count,
      limit: take,
    };
  }

  async softDelete(id: string): Promise<void> {
    await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
      },
    });
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

  async getById(id: string): Promise<IUser> {
    return await this.prisma.user.findFirst({
      where: {
        id,
      },
    });
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
