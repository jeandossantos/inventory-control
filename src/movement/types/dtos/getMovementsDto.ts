import { IsDate } from 'class-validator';

export class GetMovementsDto {
  @IsDate()
  from?: string;

  @IsDate()
  to?: string;

  page: number;

  search: string;
}
