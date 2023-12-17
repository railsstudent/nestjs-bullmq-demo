import { IsNumber } from 'class-validator';

export class UnaryOperationDto {
  @IsNumber()
  num: number;
}
