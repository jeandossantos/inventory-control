import { JwtService } from '@nestjs/jwt';
import { SECRET } from './constants';
import { CreateUserData } from '../user/types/user.interface';

export async function tokenGenerator(user: CreateUserData) {
  const jwtService = new JwtService({
    secret: SECRET,
  });

  return `Bearer ${await jwtService.signAsync(user)}`;
}
