import { ArrayNotEmpty, IsArray } from 'class-validator';

export class ArrayOperationDto {
  @IsArray()
  @ArrayNotEmpty()
  data: number[];
}
