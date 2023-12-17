import { ArrayNotEmpty, IsArray } from 'class-validator';

export class ComparisonOperationDto {
  @IsArray()
  @ArrayNotEmpty()
  data: number[];
}
