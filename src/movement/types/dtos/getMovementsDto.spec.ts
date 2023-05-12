import { validate } from 'class-validator';
import { GetMovementsDto } from './getMovementsDto';

describe('GetMovementsDto', () => {
  it('should allow valid "from" and "to" properties', async () => {
    const dto = new GetMovementsDto();
    dto.from = new Date('2022-01-01');
    dto.to = new Date('2022-01-31');

    const errors = await validate(dto);
    expect(errors).toHaveLength(0);
  });
});
