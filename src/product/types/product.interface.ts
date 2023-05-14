export interface IProduct {
  id: string;
  code: string;
  name: string;
  description?: string;
  currentQuantity: number;
  quantityIn: number;
  quantityOut: number;
  minStock: number;
  price: string;
}

export interface CreateProductData {
  code: string;
  name: string;
  description?: string;
  quantity: number;
  minStock: number;
  price: string;
  userId: string;
}

export interface UpdateProductData {
  name: string;
  description?: string;
  currentQuantity: number;
  minStock: number;
  price: string;
}

export interface AddProductData {
  productId: string;
  quantity: number;
  userId: string;
}

export interface SubtractProductData extends AddProductData {}

export interface PaginatedProduct {
  count: number;
  limit: number;
  data: Partial<IProduct>[];
}
