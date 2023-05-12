import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { SECRET } from './../utils/constants';
import UserRepository, {
  AbstractUserRepository,
} from '../user/user.repository';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: SECRET,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: AbstractUserRepository,
      useClass: UserRepository,
    },
  ],
})
export class AuthModule {}
