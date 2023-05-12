import { BadRequestException, Injectable } from '@nestjs/common';

import type UserRepository from './user.repository';
import type { CreateUserDto } from './types/dtos/createUserDto';
import type { UpdateUserDto } from './types/dtos/updateUserDto';

import { isEqual } from '../utils/isEqual';
import { hashPassword } from '../utils/hashPassword';

@Injectable()
export class UserService {
  constructor(private readonly repository: UserRepository) {}

  async create(dto: CreateUserDto) {
    if (!isEqual(dto.password, dto.confirmedPassword)) {
      throw new BadRequestException('Passwords does not match!');
    }

    const userAlreadyExists = !!(await this.repository.getByEmail(dto.email));

    if (userAlreadyExists) {
      throw new BadRequestException('User already exists!');
    }

    dto.password = await hashPassword(dto.password);

    await this.repository.create(dto);
  }

  async update(id: string, dto: UpdateUserDto) {
    const userExists = !!(await this.repository.getById(id));

    if (!userExists) {
      throw new BadRequestException('User not found!');
    }

    await this.repository.update(id, dto);
  }

  async delete(id: string) {
    const userExists = !!(await this.repository.getById(id));

    if (!userExists) {
      throw new BadRequestException('User not found!');
    }

    await this.repository.softDelete(id);
  }

  async getAll(search: string, page: number) {
    const result = await this.repository.getAll({
      search,
      page,
    });

    return result;
  }
}
