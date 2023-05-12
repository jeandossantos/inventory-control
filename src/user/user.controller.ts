import {
  Body,
  Controller,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './types/dtos/createUserDto';
import { UpdateProductDto } from 'src/product/types/dtos/productDto';
import { UpdateUserDto } from './types/dtos/updateUserDto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post()
  async create(@Body() dto: CreateUserDto) {
    await this.userService.create(dto);
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateUserDto,
  ) {
    await this.userService.update(id, dto);
  }
}
