import { BadRequestException } from '@nestjs/common';
import { MovementRepository } from './movement.repository';
import { MovementService } from './movement.service';

describe('#MovementService', () => {
  const movementServiceMock: MovementRepository = {
    getAll: jest.fn(),
  };

  describe('#getAll', () => {
    test('should throw new BadRequestException if range date is invalid', async () => {
      movementServiceMock.getAll = jest.fn();

      const dto = {
        from: new Date('2023-05-12'),
        to: new Date('2023-05-01'),
      };

      const service = new MovementService(movementServiceMock);

      await expect(service.getAll(dto)).rejects.toThrow(
        new BadRequestException(
          'Invalid date range: "from" date cannot be greater than "to" date',
        ),
      );

      expect(movementServiceMock.getAll).not.toHaveBeenCalled();
    });

    test('should return a list of movement', async () => {
      movementServiceMock.getAll = jest.fn().mockResolvedValue({
        data: [],
        count: 10,
        limit: 10,
      });

      const service = new MovementService(movementServiceMock);

      const result = await service.getAll({});

      expect(movementServiceMock.getAll).toHaveBeenCalled();
      expect(result).toHaveProperty('data');
      expect(result).toHaveProperty('limit');
      expect(result).toHaveProperty('count');
    });
  });
});
