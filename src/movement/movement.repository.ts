import { Injectable } from '@nestjs/common';
import {
  PaginatedMovement,
  getMovementsData,
} from './types/movement.interface';

interface IMovementRepository {
  getAll(data: getMovementsData): Promise<PaginatedMovement>;
}

@Injectable()
export class MovementRepository implements IMovementRepository {
  getAll(data: getMovementsData): Promise<PaginatedMovement> {
    throw new Error('Method not implemented.');
  }
}
