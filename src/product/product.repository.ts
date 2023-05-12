import { Injectable } from '@nestjs/common';
import {
  AddProductData,
  CreateProductData,
  IProduct,
  PaginatedProduct,
  SubtractProductData,
} from './types/product.interface';
import { UpdateProductDto } from './types/dtos/productDto';

export abstract class AbstractProductRepository {
  abstract create(product: CreateProductData): Promise<IProduct>;
  abstract update(id: string, product: UpdateProductDto): Promise<void>;
  abstract findAll(search: string, page: number): Promise<PaginatedProduct>;
  abstract findByCode(code: string): Promise<IProduct>;
  abstract addProduct(product: AddProductData): Promise<void>;
  abstract subtractProduct(product: SubtractProductData): Promise<void>;
}

@Injectable()
export class ProductRepository extends AbstractProductRepository {
  create(product: CreateProductData): Promise<IProduct> {
    throw new Error('Method not implemented.');
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
