import { Injectable } from '@nestjs/common';

interface ICreateMovement {
  productId: string;
  userId: string;
  quantity: number;
  unitPrice: string;
  type: 'in' | 'out';
}

@Injectable()
export class MovementRepository {
  async create(movement: ICreateMovement) {}
}
