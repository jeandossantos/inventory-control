import {
  Controller,
  Get,
  ParseIntPipe,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { MovementService } from './movement.service';
import { GetMovementsDto } from './types/dtos/getMovementsDto';
import { ParseDatePipe } from '../@pipes/ParseDatePipe';

@Controller('movements')
export class MovementController {
  constructor(private readonly movementService: MovementService) {}

  @Get()
  async getAll(
    @Query('search') search: string = '',
    @Query('page', ParseIntPipe) page: number = 1,
    @Query('from', ParseDatePipe) from: Date,
    @Query('to', ParseDatePipe) to: Date,
  ) {
    return await this.movementService.getAll({
      search,
      page,
      to: to,
      from: from,
    });
  }
}
