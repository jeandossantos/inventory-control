import { Injectable } from '@nestjs/common';
import { ProductRepository } from './product.repository';
import type { CreateProductDto } from './dto/product.dto';

@Injectable()
export class ProductService {
  constructor(private repository: ProductRepository) {}

  async create(product: CreateProductDto) {
    await this.repository.create(product);
  }
}
