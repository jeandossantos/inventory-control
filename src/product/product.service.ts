import { Injectable } from '@nestjs/common';

import type { ProductRepository } from './product.repository';
import type {
  AddProductDto,
  CreateProductDto,
  SubtractProductDto,
  UpdateProductDto,
} from './dto/product.dto';
import type { MovementRepository } from 'src/movement/movement.repository';
import { generateUniqueCode } from '../utils/generateUniqueCode';

interface RecordMovementProps {
  productId: string;
  quantity: number;
  unitPrice: string;
  userId: string;
}

@Injectable()
export class ProductService {
  constructor(
    private readonly repository: ProductRepository,
    private readonly movementRepository: MovementRepository,
  ) {}

  async create(product: CreateProductDto) {
    const code = generateUniqueCode();
    const result = await this.repository.create({
      ...product,
      code,
    });

    // await this.recordEntryMovement({
    //   quantity: result.currentQuantity,
    //   userId: result.userId,
    //   productId: result.id,
    //   unitPrice: result.price,
    // });
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
