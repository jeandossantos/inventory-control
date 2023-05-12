import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import {
  AbstractProductRepository,
  ProductRepository,
} from './product.repository';

@Module({
  imports: [],
  controllers: [ProductController],
  providers: [
    ProductService,
    {
      provide: AbstractProductRepository,
      useClass: ProductRepository,
    },
  ],
})
export class ProductModule {}
