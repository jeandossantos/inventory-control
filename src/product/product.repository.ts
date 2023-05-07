import { Injectable } from '@nestjs/common';
import type {
  AddProductDto,
  CreateProductDto,
  SubtractProductDto,
  UpdateProductDto,
} from './dto/product.dto';

export interface CreateProductData extends CreateProductDto {
  code: string;
}

interface IProductRepository {
  create(
    product: CreateProductData,
  ): Promise<CreateProductDto & { id: string }>;
  update(id: string, product: UpdateProductDto): Promise<void>;
  findAll(search: string, page: number): Promise<PaginatedProduct[]>;
  findByCode(code: string): Promise<CreateProductData & { code: string }>;
  addProduct(product: AddProductDto): Promise<void>;
  subtractProduct(product: SubtractProductDto): Promise<void>;
}

export interface PaginatedProduct {
  count: number;
  limit: number;
  data: IProductRepository[];
}

@Injectable()
export class ProductRepository implements IProductRepository {
  addProduct(product: AddProductDto): Promise<void> {
    throw new Error('Method not implemented.');
  }
  subtractProduct(product: SubtractProductDto): Promise<void> {
    throw new Error('Method not implemented.');
  }
  findByCode(code: string): Promise<CreateProductData & { code: string }> {
    throw new Error('Method not implemented.');
  }
  create(
    product: CreateProductData,
  ): Promise<CreateProductDto & { id: string }> {
    throw new Error('Method not implemented.');
  }
  update(id: string, product: UpdateProductDto): Promise<void> {
    throw new Error('Method not implemented.');
  }
  findAll(search: string, page: number): Promise<PaginatedProduct[]> {
    throw new Error('Method not implemented.');
  }
}
