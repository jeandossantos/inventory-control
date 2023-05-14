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
  Req,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto, UpdateProductDto } from './types/dtos/productDto';
import { Request } from 'express';

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

  @Patch('/in/:id')
  async addProduct(
    @Req() req: Request,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    await this.productService.addProduct({
      productId: id,
      userId: req.user.id,
      quantity: req.body.quantity,
    });
  }

  @Patch('/out/:id')
  async subtractProduct(
    @Req() req: Request,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    await this.productService.subtractProduct({
      productId: id,
      userId: req.user.id,
      quantity: req.body.quantity,
    });
  }
}
