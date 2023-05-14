import { IsDate } from 'class-validator';

export class GetMovementsDto {
  @IsDate()
  from?: Date;

  @IsDate()
  to?: Date;

  page: number;

  search: string;
}
