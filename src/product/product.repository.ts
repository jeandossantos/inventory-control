import { Injectable } from '@nestjs/common';
import {
  AddProductData,
  CreateProductData,
  IProduct,
  SubtractProductData,
} from './types/product.interface';

interface IProductRepository {
  create(product: CreateProductData): Promise<IProduct>;
  update(id: string, product: IProduct): Promise<void>;
  findAll(search: string, page: number): Promise<PaginatedProduct[]>;
  findByCode(code: string): Promise<IProduct>;
  addProduct(product: AddProductData): Promise<void>;
  subtractProduct(product: SubtractProductData): Promise<void>;
}

export interface PaginatedProduct {
  count: number;
  limit: number;
  data: IProductRepository[];
}

@Injectable()
export class ProductRepository implements IProductRepository {
  create(product: CreateProductData): Promise<IProduct> {
    throw new Error('Method not implemented.');
  }
  update(id: string, product: IProduct): Promise<void> {
    throw new Error('Method not implemented.');
  }
  findAll(search: string, page: number): Promise<PaginatedProduct[]> {
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
