export type ProductType = {
  id: string;
  code: string;
  name: string;
  description?: string;
  currentQuantity: number;
  quantityIn: number;
  quantityOut: number;
  minStock: number;
  price: string;
};

export type CreateProductType = Omit<ProductType, 'id'> & {
  userId: string;
};

export type UpdateProductType = Omit<
  ProductType,
  'quantityIn' | 'quantityOut' | 'id' | 'code'
>;

export type AddProductType = {
  productId: string;

  quantity: number;
};

export type SubtractProductType = AddProductType;

export type IPaginatedProduct = {
  count: number;
  limit: number;
  data: ProductType[];
};
