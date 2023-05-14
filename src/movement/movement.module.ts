import { Module } from '@nestjs/common';
import { MovementService } from './movement.service';
import { MovementController } from './movement.controller';
import { IMovementRepository, MovementRepository } from './movement.repository';

@Module({
  controllers: [MovementController],
  providers: [
    MovementService,
    { useClass: MovementRepository, provide: IMovementRepository },
  ],
})
export class MovementModule {}
