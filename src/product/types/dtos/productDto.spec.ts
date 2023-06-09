import { validate } from 'class-validator';
import { CreateProductDto } from './productDto';

describe('ProductDto', () => {
  let createProductDto: CreateProductDto;

  describe('#CreateProductDto', () => {
    beforeEach(() => {
      createProductDto = new CreateProductDto();
      createProductDto.name = 'Product';
      createProductDto.description = 'Product description';
      createProductDto.minStock = 5;
      createProductDto.quantity = 100;
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

    it('should fail validation if quantity is empty, not number or less than 0', async () => {
      createProductDto.quantity = undefined;

      const errors = await validate(createProductDto);
      expect(errors.length).toBe(1);

      expect(errors[0].constraints).toMatchObject({
        isNotEmpty: 'quantity should not be empty',
        isNumber:
          'quantity must be a number conforming to the specified constraints',
        min: 'quantity must not be less than 0',
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

    it('should fail validation if price is empty', async () => {
      createProductDto.price = '';

      const errors = await validate(createProductDto);
      expect(errors.length).toBe(1);
      expect(errors[0].constraints).toMatchObject({
        isNotEmpty: 'price should not be empty',
      });
    });

    it('should pass with a valid product', async () => {
      const errors = await validate(createProductDto);
      expect(errors.length).toBe(0);
    });
  });
});
