import { Injectable } from '@nestjs/common';
import type { ProductRepository } from './product.repository';
import type { CreateProductDto, UpdateProductDto } from './dto/product.dto';

@Injectable()
export class ProductService {
  constructor(private repository: ProductRepository) {}

  async create(product: CreateProductDto) {
    await this.repository.create(product);
  }

  async update(id: string, product: UpdateProductDto) {
    await this.repository.update(id, product);
  }

  async findAll() {
    const result = await this.repository.findAll();

    return result;
  }
}
