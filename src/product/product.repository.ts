import { Injectable } from '@nestjs/common';
import type { CreateProductDto, UpdateProductDto } from './dto/product.dto';

@Injectable()
export class ProductRepository {
  async create(product: CreateProductDto) {}
  async update(id: string, product: UpdateProductDto) {}
  async findAll() {}
}
