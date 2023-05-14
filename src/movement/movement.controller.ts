import {
  Controller,
  Get,
  ParseIntPipe,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { MovementService } from './movement.service';

@Controller('movements')
export class MovementController {
  constructor(private readonly movementService: MovementService) {}

  @Get()
  async getAll(
    @Query('search') search: string = '',
    @Query('page', ParseIntPipe) page: number = 1,
    @Query('from') from: string,
    @Query('to') to: string,
  ) {
    return await this.movementService.getAll({
      search,
      page,
      from,
      to,
    });
  }
}
