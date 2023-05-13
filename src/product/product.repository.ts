import { Injectable } from '@nestjs/common';
import {
  AddProductData,
  CreateProductData,
  IProduct,
  PaginatedProduct,
  SubtractProductData,
} from './types/product.interface';
import { UpdateProductDto } from './types/dtos/productDto';
import { PrismaService } from '../prisma/prisma.service';

export abstract class AbstractProductRepository {
  abstract create(product: CreateProductData): Promise<void>;
  abstract update(id: string, product: UpdateProductDto): Promise<void>;
  abstract findAll(search: string, page: number): Promise<PaginatedProduct>;
  abstract findByCode(code: string): Promise<IProduct>;
  abstract addProduct(product: AddProductData): Promise<void>;
  abstract subtractProduct(product: SubtractProductData): Promise<void>;
}

@Injectable()
export class ProductRepository extends AbstractProductRepository {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async create(product: CreateProductData): Promise<void> {
    const { name, description, code, minStock, quantity, price, userId } =
      product;

    await this.prisma.product.create({
      data: {
        name,
        description,
        code,
        minStock,
        currentQuantity: quantity,
        price,
        quantityIn: quantity,
        quantityOut: 0,

        Movement: {
          create: {
            moment: new Date(),
            unitPrice: price,
            type: 'in',
            quantity: quantity,
            userId,
          },
        },
      },
    });
  }

  update(id: string, product: UpdateProductDto): Promise<void> {
    throw new Error('Method not implemented.');
  }
  findAll(search: string, page: number): Promise<PaginatedProduct> {
    throw new Error('Method not implemented.');
  }
  findByCode(code: string): Promise<IProduct> {
    throw new Error('Method not implemented.');
  }
  addProduct(product: AddProductData): Promise<void> {
    throw new Error('Method not implemented.');
  }
  subtractProduct(product: SubtractProductData): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
