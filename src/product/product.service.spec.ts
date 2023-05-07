import { ProductService } from './product.service';
import { CreateProductDto } from './dto/product.dto';
import { randomUUID } from 'crypto';
import type { ProductRepository } from './product.repository';
import { MovementRepository } from 'src/movement/movement.repository';

describe('ProductService', () => {
  beforeEach(async () => {
    jest.resetAllMocks();
    jest.restoreAllMocks();
  });

  const productMock = new CreateProductDto();
  productMock.name = 'Product';
  productMock.description = 'Product description';
  productMock.currentQuantity = 50;
  productMock.quantityIn = 100;
  productMock.quantityOut = 50;
  productMock.minStock = 5;
  productMock.price = '10.50';

  const productRepository: ProductRepository = {
    create: jest.fn(),
    update: jest.fn(),
    findAll: jest.fn(),
    findByCode: jest.fn(),
    addProduct: jest.fn(),
    subtractProduct: jest.fn(),
  };

  const movementRepository: MovementRepository = {
    create: jest.fn(),
  };

  describe('#createProduct', () => {
    test('should create a product', async () => {
      const repositoryMock = Object.assign({}, productRepository, {
        create: jest.fn().mockResolvedValue({
          id: randomUUID(),
          ...productMock,
        }),
      });

      const movementRepositoryMock = Object.assign({}, movementRepository);

      const service: ProductService = new ProductService(
        repositoryMock,
        movementRepositoryMock,
      );

      await service.create(productMock);

      expect(repositoryMock.create).toHaveBeenCalled();
      //expect(movementRepositoryMock.create).toHaveBeenCalled();
    });
  });

  describe('#updateProduct', () => {
    test('should update a product', async () => {
      const ID = randomUUID();

      const repositoryMock = Object.assign({}, productRepository, {
        update: jest.fn().mockResolvedValue({ id: ID, ...productMock }),
      });

      const movementRepositoryMock = Object.assign({}, movementRepository);

      const service: ProductService = new ProductService(
        repositoryMock,
        movementRepositoryMock,
      );

      await service.update(ID, productMock);

      expect(repositoryMock.update).toHaveBeenCalled();
    });
  });

  describe('#findAllProducts paginated', () => {
    test('should find products', async () => {
      const repositoryMock = Object.assign({}, productRepository, {
        findAll: jest.fn().mockResolvedValue({
          data: [],
          count: 50,
          limit: 10,
        }),
      });

      const movementRepositoryMock = Object.assign({}, movementRepository);

      const service: ProductService = new ProductService(
        repositoryMock,
        movementRepositoryMock,
      );
      const result = await service.findAll('', 1);

      expect(result).toHaveProperty('data');
      expect(result).toHaveProperty('count');
      expect(result).toHaveProperty('limit');

      expect(repositoryMock.findAll).toHaveBeenCalled();
    });
  });

  describe('#findByCode paginated', () => {
    test('should not find a product by its code if not exists', async () => {
      const repositoryMock = Object.assign({}, productRepository, {
        findAll: jest.fn().mockResolvedValue({
          data: [],
          count: 50,
          limit: 10,
        }),
        findByCode: jest.fn().mockResolvedValue(undefined),
      });

      const movementRepositoryMock = Object.assign({}, movementRepository);

      const service: ProductService = new ProductService(
        repositoryMock,
        movementRepositoryMock,
      );

      const result = await service.findByCode('123456');

      expect(result).toBeFalsy();
      expect(repositoryMock.findByCode).toHaveBeenCalled();
    });

    test('should find a product by its code if it exists', async () => {
      const repositoryMock = Object.assign({}, productRepository, {
        findAll: jest.fn().mockResolvedValue({
          data: [],
          count: 50,
          limit: 10,
        }),
        findByCode: jest.fn().mockResolvedValue({}),
      });

      const movementRepositoryMock = Object.assign({}, movementRepository);

      const service: ProductService = new ProductService(
        repositoryMock,
        movementRepositoryMock,
      );

      const result = await service.findByCode('123456');

      expect(result).toBeTruthy();
      expect(repositoryMock.findByCode).toHaveBeenCalled();
    });
  });

  describe('#addProduct', () => {
    test('should add the passed quantity to the current quantity of the product', async () => {
      const repositoryMock = Object.assign({}, productRepository, {
        findAll: jest.fn(),
        findByCode: jest.fn(),
        addProduct: jest.fn(),
      });

      const movementRepositoryMock = Object.assign({}, movementRepository);

      const service: ProductService = new ProductService(
        repositoryMock,
        movementRepositoryMock,
      );

      await service.addProduct({
        productId: 'some-id',
        quantity: 10,
      });

      expect(repositoryMock.addProduct).toHaveBeenCalled();
    });
  });

  describe('#subtractProduct', () => {
    test('should add the passed quantity to the current quantity of the product', async () => {
      const repositoryMock = Object.assign({}, productRepository, {
        findAll: jest.fn(),
        findByCode: jest.fn(),
        subtractProduct: jest.fn(),
      });

      const movementRepositoryMock = Object.assign({}, movementRepository);

      const service: ProductService = new ProductService(
        repositoryMock,
        movementRepositoryMock,
      );

      await service.subtractProduct({
        productId: 'some-id',
        quantity: 10,
      });

      expect(repositoryMock.subtractProduct).toHaveBeenCalled();
    });
  });
});
