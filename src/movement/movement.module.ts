import { Module } from '@nestjs/common';
import { MovementService } from './movement.service';
import { MovementController } from './movement.controller';
import { MovementRepository } from './movement.repository';

@Module({
  controllers: [MovementController],
  providers: [MovementService, MovementRepository],
  exports: [MovementRepository],
})
export class MovementModule {}
