import { BadRequestException, Injectable } from '@nestjs/common';
import { IMovementRepository } from './movement.repository';
import type { GetMovementsDto } from './types/dtos/getMovementsDto';

@Injectable()
export class MovementService {
  constructor(private readonly repository: IMovementRepository) {}

  async getAll(dto: GetMovementsDto) {
    if (
      dto.from &&
      dto.to &&
      new Date(dto.from).getTime() > new Date(dto.to).getTime()
    ) {
      throw new BadRequestException(
        'Invalid date range: "from" date cannot be greater than "to" date',
      );
    }

    const { data, count, limit } = await this.repository.getAll({
      ...dto,
      from: dto.from ? new Date(dto.from) : null,
      to: dto.to ? new Date(dto.to) : null,
    });

    return {
      data,
      count,
      limit,
    };
  }
}
