import { IsNumber } from 'class-validator';

export class BinaryOperationDto {
  @IsNumber()
  num: number;

  @IsNumber()
  num2: number;
}
