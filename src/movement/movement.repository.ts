import { Injectable } from '@nestjs/common';
import {
  PaginatedMovement,
  getMovementsData,
} from './types/movement.interface';
import { PrismaService } from '../prisma/prisma.service';

export abstract class IMovementRepository {
  abstract getAll(data: getMovementsData): Promise<PaginatedMovement>;
}

@Injectable()
export class MovementRepository extends IMovementRepository {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async getAll({
    from,
    to,
    page,
    search,
  }: getMovementsData): Promise<PaginatedMovement> {
    const limit = 10;
    const skip = (page - 1) * limit;
    let where = {};

    if (from && to) {
      where = {
        moment: {
          gte: from,
          lte: to,
        },
      };
    }

    const count = await this.prisma.movement.count({
      where,
    });

    const movements = await this.prisma.movement.findMany({
      where,
      skip,
      take: limit,
      orderBy: { moment: 'desc' },
      include: {
        product: {
          select: {
            id: true,
            name: true,
          },
        },
        user: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return {
      count,
      limit,
      data: movements,
    };
  }
}
