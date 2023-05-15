import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { GetMovementsDto } from './getMovementsDto';

describe('GetMovementsDto', () => {
  it('should be valid when all properties are set correctly', async () => {
    const dto = new GetMovementsDto();
    dto.from = new Date('2023-05-10');
    dto.to = new Date('2023-05-15');
    dto.page = 1;
    dto.search = '';

    const errors = await validate(dto);
    expect(errors).toHaveLength(0);
  });

  it('should be invalid when "from" property is not a Date', async () => {
    const dto = new GetMovementsDto();
    dto.from = 'invalid date' as any;
    dto.to = new Date('2023-05-15');
    dto.page = 1;
    dto.search = '';

    const errors = await validate(dto);
    expect(errors).toHaveLength(1);
    expect(errors[0].constraints).toHaveProperty('isDate');
  });

  it('should be invalid when "to" property is not a Date', async () => {
    const dto = new GetMovementsDto();
    dto.from = new Date('2023-05-10');
    dto.to = 'invalid date' as any;
    dto.page = 1;
    dto.search = '';

    const errors = await validate(dto);
    expect(errors).toHaveLength(1);
    expect(errors[0].constraints).toHaveProperty('isDate');
  });
});
