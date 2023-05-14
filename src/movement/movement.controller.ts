import { Controller, Get, ParseIntPipe, Query } from '@nestjs/common';
import { MovementService } from './movement.service';

@Controller('movements')
export class MovementController {
  constructor(private readonly movementService: MovementService) {}

  @Get()
  async getAll(
    @Query('search') search: string,
    @Query('page', ParseIntPipe) page: number,
    @Query('from') from: Date,
    @Query('to') to: Date,
  ) {
    return await this.movementService.getAll({ search, page, from, to });
  }
}
