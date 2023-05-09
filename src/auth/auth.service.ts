import { Injectable } from '@nestjs/common';
import type UserRepository from 'src/user/user.repository';
import type { AuthDto } from './types/dtos/authDto';

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  async authenticate(dto: AuthDto) {}
}
