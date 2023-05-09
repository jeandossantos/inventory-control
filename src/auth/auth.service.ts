import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import type UserRepository from 'src/user/user.repository';
import type { AuthDto } from './types/dtos/authDto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async authenticate(dto: AuthDto) {
    const userExists = await this.userRepository.getByEmail(dto.email);

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
