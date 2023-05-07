import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { MovementModule } from './movement/movement.module';

@Module({
  imports: [ProductModule, MovementModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
