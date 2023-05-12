import { Injectable } from '@nestjs/common';

import { AbstractProductRepository } from './product.repository';
import type {
  AddProductDto,
  CreateProductDto,
  SubtractProductDto,
  UpdateProductDto,
} from './types/dtos/productDto';
import { generateUniqueCode } from '../utils/generateUniqueCode';

@Injectable()
export class ProductService {
  constructor(private readonly repository: AbstractProductRepository) {}

  async create(product: CreateProductDto) {
    const code = generateUniqueCode();
    const result = await this.repository.create({
      ...product,
      code,
    });
  }

  async update(id: string, product: UpdateProductDto) {
    await this.repository.update(id, product);
  }

  async findAll(search: string, page: number) {
    const result = await this.repository.findAll(search, page);

    return result;
  }

  async findByCode(code: string) {
    const product = await this.repository.findByCode(code);

    return product;
  }

  async addProduct({ productId, quantity }: AddProductDto) {
    await this.repository.addProduct({ productId, quantity });
  }

  async subtractProduct({ productId, quantity }: SubtractProductDto) {
    await this.repository.subtractProduct({ productId, quantity });
  }
}
