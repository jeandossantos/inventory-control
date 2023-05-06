import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';

export class CreateProductDto {
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
  purchasePrice: string;

  @IsString()
  @IsNotEmpty()
  salePrice: string;
}
