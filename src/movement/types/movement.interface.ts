export interface IMovement {
  moment: Date;
  unitPrice: string;
  quantity: number;
  productId: string;
  userId: string;
  type: 'in' | 'out';
}

export interface getMovementsData {
  from?: Date;
  to?: Date;
}

export interface PaginatedMovement {
  count: number;
  limit: number;
  data: Partial<IMovement>[];
}
