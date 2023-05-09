import { validate } from 'class-validator';
import { CreateProductDto, AddProductDto } from './productDto';

describe('ProductDto', () => {
  let createProductDto: CreateProductDto;

  describe('#CreateProductDto', () => {
    beforeEach(() => {
      createProductDto = new CreateProductDto();
      createProductDto.name = 'Product';
      createProductDto.description = 'Product description';
      createProductDto.currentQuantity = 50;
      createProductDto.quantityIn = 100;
      createProductDto.quantityOut = 50;
      createProductDto.minStock = 5;
      createProductDto.price = '10.50';
    });

    it('should fail validation if name is empty', async () => {
      createProductDto.name = '';

      const errors = await validate(createProductDto);
      expect(errors.length).toBe(1);
      expect(errors[0].constraints).toMatchObject({
        isNotEmpty: 'name should not be empty',
      });
    });

    it('should not fail validation if description is empty', async () => {
      createProductDto.description = '';

      const errors = await validate(createProductDto);
      expect(errors.length).toBe(0);
    });

    it('should fail validation if currentQuantity is empty, not number or less than 0', async () => {
      createProductDto.currentQuantity = undefined;

      const errors = await validate(createProductDto);
      expect(errors.length).toBe(1);

      expect(errors[0].constraints).toMatchObject({
        isNotEmpty: 'currentQuantity should not be empty',
        isNumber:
          'currentQuantity must be a number conforming to the specified constraints',
        min: 'currentQuantity must not be less than 0',
      });
    });

    it('should fail validation if minStock is empty, not number or less than 0', async () => {
      createProductDto.minStock = undefined;

      const errors = await validate(createProductDto);
      expect(errors.length).toBe(1);

      expect(errors[0].constraints).toMatchObject({
        isNotEmpty: 'minStock should not be empty',
        isNumber:
          'minStock must be a number conforming to the specified constraints',
        min: 'minStock must not be less than 0',
      });
    });

    it('should fail validation if quantityIn is empty, not number or less than 0', async () => {
      createProductDto.quantityIn = undefined;

      const errors = await validate(createProductDto);
      expect(errors.length).toBe(1);

      expect(errors[0].constraints).toMatchObject({
        isNotEmpty: 'quantityIn should not be empty',
        isNumber:
          'quantityIn must be a number conforming to the specified constraints',
        min: 'quantityIn must not be less than 0',
      });
    });

    it('should fail validation if price is empty', async () => {
      createProductDto.price = '';

      const errors = await validate(createProductDto);
      expect(errors.length).toBe(1);
      expect(errors[0].constraints).toMatchObject({
        isNotEmpty: 'price should not be empty',
      });
    });

    it('should fail validation if quantityOut is empty, not number or less than 0', async () => {
      createProductDto.quantityOut = undefined;

      const errors = await validate(createProductDto);
      expect(errors.length).toBe(1);

      expect(errors[0].constraints).toMatchObject({
        isNotEmpty: 'quantityOut should not be empty',
        isNumber:
          'quantityOut must be a number conforming to the specified constraints',
        min: 'quantityOut must not be less than 0',
      });
    });

    it('should pass with a valid product', async () => {
      const errors = await validate(createProductDto);
      expect(errors.length).toBe(0);
    });
  });

  describe('AddProductDto', () => {
    it('should validate the AddProductDto class', async () => {
      // Create an instance of the AddProductDto class with valid data
      const addProductDto = new AddProductDto();
      addProductDto.productId = '0f84fbf8-27d9-4ea3-b3cc-12ec32c5e34f';
      addProductDto.quantity = 5;

      // Validate the AddProductDto instance
      const errors = await validate(addProductDto);

      // Assert that there are no errors
      expect(errors.length).toBe(0);
    });

    it('should not validate the AddProductDto class with invalid data', async () => {
      // Create an instance of the AddProductDto class with invalid data
      const addProductDto = new AddProductDto();
      addProductDto.productId = 'invalid_uuid';
      addProductDto.quantity = null;

      // Validate the AddProductDto instance
      const errors = await validate(addProductDto);

      // Assert that there are errors
      expect(errors.length).toBeGreaterThan(0);
    });
  });
});
