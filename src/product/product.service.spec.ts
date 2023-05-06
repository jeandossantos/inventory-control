import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/product.dto';

describe('ProductService', () => {
  beforeEach(async () => {
    jest.resetAllMocks();
    jest.restoreAllMocks();
  });

  describe('#createProduct', () => {
    const productMock = new CreateProductDto();
    productMock.name = 'Product';
    productMock.description = 'Product description';
    productMock.quantity = 10;
    productMock.minStock = 5;
    productMock.purchasePrice = '10.50';
    productMock.salePrice = '15.5';

    test('should create a product', async () => {
      const repositoryMock = {
        create: jest.fn(),
      };

      const service: ProductService = new ProductService(repositoryMock);
      const result = await service.create(productMock);

      expect(repositoryMock.create).toHaveBeenCalled();
    });
  });

  describe('#updateProduct', () => {
    test('should update a product', async () => {});
  });
});
