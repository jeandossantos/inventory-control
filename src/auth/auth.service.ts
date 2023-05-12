import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import type { AuthDto } from './types/dtos/authDto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AbstractUserRepository } from '../user/user.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly repository: AbstractUserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async authenticate(dto: AuthDto) {
    const userExists = await this.repository.getByEmail(dto.email);

    if (!userExists) {
      throw new UnauthorizedException('E-mail/Password invalid(s)!');
    }

    const isMatch = await bcrypt.compare(dto.password, userExists.password);

    if (!isMatch) {
      throw new UnauthorizedException('E-mail/Password invalid(s)!');
    }

    const { name, email, id } = userExists;
    const payload = {
      sub: id,
      email,
    };
    return {
      id,
      name,
      email,
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
