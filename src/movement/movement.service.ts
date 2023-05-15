import { BadRequestException, Injectable } from '@nestjs/common';
import { IMovementRepository } from './movement.repository';
import { GetMovementsDto } from './types/dtos/getMovementsDto';

@Injectable()
export class MovementService {
  constructor(private readonly repository: IMovementRepository) {}

  async getAll(dto: GetMovementsDto) {
    if (dto.from && dto.to && dto.from.getTime() > dto.to.getTime()) {
      throw new BadRequestException(
        'Invalid date range: "from" date cannot be greater than "to" date',
      );
    }

    const { data, count, limit } = await this.repository.getAll({
      ...dto,
      from: dto.from ? dto.from : null,
      to: dto.to ? dto.to : null,
    });

    return {
      data,
      count,
      limit,
    };
  }
}
