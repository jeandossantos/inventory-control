import { BadRequestException, Injectable } from '@nestjs/common';
import { MovementRepository } from './movement.repository';
import type { GetMovementsDto } from './types/dtos/getMovementsDto';

@Injectable()
export class MovementService {
  constructor(private readonly repository: MovementRepository) {}

  async getAll(dto: GetMovementsDto) {
    if (dto.from && dto.to && dto.from.getTime() > dto.to.getTime()) {
      throw new BadRequestException(
        'Invalid date range: "from" date cannot be greater than "to" date',
      );
    }

    const { data, count, limit } = await this.repository.getAll({});

    const movements = data.map((movement) => {
      return {
        ...movement,
        type: movement.type === 'in' ? 'ENTRADA' : 'SAÍDA',
      };
    });

    return {
      data: movements,
      count,
      limit,
    };
  }
}
