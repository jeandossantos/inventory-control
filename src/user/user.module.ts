import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import UserRepository, { AbstractUserRepository } from './user.repository';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: AbstractUserRepository,
      useClass: UserRepository,
    },
  ],
})
export class UserModule {}
