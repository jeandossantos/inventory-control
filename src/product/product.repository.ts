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

  async update(id: string, product: UpdateProductDto): Promise<void> {
    await this.prisma.product.update({
      data: product,
      where: { id },
    });
  }

  async findAll(search: string, page: number): Promise<PaginatedProduct> {
    const limit = 10;
    const skip = (page - 1) * limit;

    const count = await this.prisma.product.count({
      where: {
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { code: { contains: search, mode: 'insensitive' } },
        ],
      },
    });

    const products = await this.prisma.product.findMany({
      where: {
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { code: { contains: search, mode: 'insensitive' } },
        ],
      },
      skip,
      take: limit,
      orderBy: { name: 'desc' },
    });

    return {
      count,
      limit,
      data: products,
    };
  }

  async findByCode(code: string): Promise<IProduct> {
    throw new Error('Method not implemented.');
  }

  async addProduct({
    productId,
    quantity,
    userId,
  }: AddProductData): Promise<void> {
    const productDB = await this.prisma.product.findUnique({
      where: { id: productId },
    });

    await this.prisma.$transaction(async (prisma) => {
      const p1 = await prisma.product.update({
        where: {
          id: productId,
        },
        data: {
          currentQuantity: productDB.currentQuantity + quantity,
          quantityIn: productDB.quantityIn + quantity,
        },
      });

      await prisma.movement.create({
        data: {
          moment: new Date(),
          quantity,
          type: 'in',
          unitPrice: productDB.price,
          productId,
          userId,
        },
      });
    });
  }

  async subtractProduct({
    productId,
    userId,
    quantity,
  }: SubtractProductData): Promise<void> {
    const productDB = await this.prisma.product.findUnique({
      where: { id: productId },
    });

    await this.prisma.$transaction(async (prisma) => {
      const p1 = await prisma.product.update({
        where: {
          id: productId,
        },
        data: {
          currentQuantity: productDB.currentQuantity - quantity,
          quantityOut: productDB.quantityIn + quantity,
        },
      });

      await prisma.movement.create({
        data: {
          moment: new Date(),
          quantity,
          type: 'out',
          unitPrice: productDB.price,
          productId,
          userId,
        },
      });
    });
  }
}
