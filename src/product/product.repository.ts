import { Injectable } from '@nestjs/common';
import type { CreateProductDto } from './dto/product.dto';

@Injectable()
export class ProductRepository {
  async create(product: CreateProductDto) {}
}
