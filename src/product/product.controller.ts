import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto, UpdateProductDto } from './types/dtos/productDto';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async create(@Body() dto: CreateProductDto) {
    await this.productService.create(dto);
  }

  @Put(':id')
  async update(
    @Body() dto: UpdateProductDto,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    await this.productService.update(id, dto);
  }

  @Get()
  async get(
    @Query('page', ParseIntPipe) page: number = 1,
    @Query('search') search: string = '',
  ) {
    return this.productService.findAll(search, page);
  }

  @Patch()
  async addProduct(@Body() data, @Param('id', ParseUUIDPipe) id: string) {
    await this.productService.addProduct(id, data.quantity);
  }
}
