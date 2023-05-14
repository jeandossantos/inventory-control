import { OmitType } from '@nestjs/mapped-types';
import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';

export class CreateProductDto {
  userId: string;
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  description: string;

  @Min(0)
  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @Min(0)
  @IsNumber()
  @IsNotEmpty()
  minStock: number;

  @IsString()
  @IsNotEmpty()
  price: string;
}

export class UpdateProductDto extends OmitType(CreateProductDto, [
  'minStock',
  'quantity',
]) {}

export class AddProductDto {
  productId: string;
  userId: string;
  quantity: number;
}

export class SubtractProductDataDto extends AddProductDto {}
