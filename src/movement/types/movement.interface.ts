export interface IMovement {
  moment: Date;
  unitPrice: string;
  quantity: number;
  product: {
    id: string;
    name: string;
  };
  user: {
    id: string;
    name: string;
  };
  type: string;
}

export interface getMovementsData {
  from?: Date;
  to?: Date;
  search: string;
  page: number;
}

export interface PaginatedMovement {
  count: number;
  limit: number;
  data: Partial<IMovement>[];
}
