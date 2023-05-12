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
  currentQuantity: number;

  @Min(0)
  @IsNumber()
  @IsNotEmpty()
  quantityIn: number;

  @Min(0)
  @IsNumber()
  @IsNotEmpty()
  quantityOut: number;

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
  'quantityIn',
  'quantityOut',
]) {}

export class AddProductDto {
  @IsUUID()
  productId: string;

  @IsNumber()
  quantity: number;
}

export class SubtractProductDto extends AddProductDto {}