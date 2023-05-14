import { ProductService } from './product.service';
import { CreateProductDto } from './types/dtos/productDto';
import { randomUUID } from 'crypto';
import type { AbstractProductRepository } from './product.repository';

describe('ProductService', () => {
  beforeEach(async () => {
    jest.resetAllMocks();
    jest.restoreAllMocks();
  });

  const productMock = new CreateProductDto();
  productMock.name = 'Product';
  productMock.description = 'Product description';
  productMock.minStock = 5;
  productMock.price = '10.50';

  const productRepositoryMock: AbstractProductRepository = {
    create: jest.fn(),
    update: jest.fn(),
    findAll: jest.fn(),
    findByCode: jest.fn(),
    addProduct: jest.fn(),
    subtractProduct: jest.fn(),
  };

  describe('#createProduct', () => {
    test('should create a product', async () => {
      productRepositoryMock.create = jest.fn().mockResolvedValue({
        id: randomUUID(),
        ...productMock,
      });

      const service: ProductService = new ProductService(productRepositoryMock);

      await service.create(productMock);

      expect(productRepositoryMock.create).toHaveBeenCalled();
    });
  });

  describe('#updateProduct', () => {
    test('should update a product', async () => {
      const ID = randomUUID();

      productRepositoryMock.update = jest
        .fn()
        .mockResolvedValue({ id: ID, ...productMock });

      const service: ProductService = new ProductService(productRepositoryMock);

      await service.update(ID, productMock);

      expect(productRepositoryMock.update).toHaveBeenCalled();
    });
  });

  describe('#findAllProducts paginated', () => {
    test('should find products', async () => {
      productRepositoryMock.findAll = jest.fn().mockResolvedValue({
        data: [],
        count: 50,
        limit: 10,
      });

      const service: ProductService = new ProductService(productRepositoryMock);
      const result = await service.findAll('', 1);

      expect(result).toHaveProperty('data');
      expect(result).toHaveProperty('count');
      expect(result).toHaveProperty('limit');

      expect(productRepositoryMock.findAll).toHaveBeenCalled();
    });
  });

  describe('#findByCode paginated', () => {
    test('should not find a product by its code if not exists', async () => {
      productRepositoryMock.findAll = jest.fn().mockResolvedValue({
        data: [],
        count: 50,
        limit: 10,
      });

      const service: ProductService = new ProductService(productRepositoryMock);

      const result = await service.findByCode('123456');

      expect(result).toBeFalsy();
      expect(productRepositoryMock.findByCode).toHaveBeenCalled();
    });

    test('should find a product by its code if it exists', async () => {
      productRepositoryMock.findByCode = jest.fn().mockResolvedValue({});
      productRepositoryMock.findAll = jest.fn().mockResolvedValue({
        data: [],
        count: 50,
        limit: 10,
      });

      const service: ProductService = new ProductService(productRepositoryMock);

      const result = await service.findByCode('123456');

      expect(result).toBeTruthy();
      expect(productRepositoryMock.findByCode).toHaveBeenCalled();
    });
  });

  describe('#addProduct', () => {
    test('should add the passed quantity to the current quantity of the product', async () => {
      const service: ProductService = new ProductService(productRepositoryMock);

      await service.addProduct({
        productId: 'some-id',
        quantity: 50,
        userId: 'some-user',
      });

      expect(productRepositoryMock.addProduct).toHaveBeenCalled();
    });
  });

  describe('#subtractProduct', () => {
    test('should add the passed quantity to the current quantity of the product', async () => {
      const service: ProductService = new ProductService(productRepositoryMock);

      await service.subtractProduct({
        productId: 'some-id',
        quantity: 50,
        userId: 'some-user',
      });

      expect(productRepositoryMock.subtractProduct).toHaveBeenCalled();
    });
  });
});
