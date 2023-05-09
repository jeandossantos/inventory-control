import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { MovementModule } from './movement/movement.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ProductModule, MovementModule, UserModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
