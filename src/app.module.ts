import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { MovementModule } from './movement/movement.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [ProductModule, MovementModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
