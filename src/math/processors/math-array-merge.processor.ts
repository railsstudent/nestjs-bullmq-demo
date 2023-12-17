import { Processor } from '@nestjs/bullmq';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Job } from 'bullmq';
import { MATH_ARRAY_MERGE } from '../constants/math-array.constant';
import { ArrayOperationDto } from '../dtos/array-operation.dto';
import { MATH_ARRAY_OPS } from '../enums/math-array-ops.enum';
import { WorkerHostProcessor } from './worker-host.processor';

@Processor(MATH_ARRAY_MERGE)
@Injectable()
export class MathArrayMergeProcessor extends WorkerHostProcessor {
  async process(job: Job<ArrayOperationDto, number | number[], string>): Promise<number | number[]> {
    const results = Object.values(await job.getChildrenValues());
    switch (job.name) {
      case MATH_ARRAY_OPS.MIN:
        return Math.min(...results);
      case MATH_ARRAY_OPS.MAX:
        return Math.max(...results);
      case MATH_ARRAY_OPS.FILTER_ODD:
      case MATH_ARRAY_OPS.FILTER_EVEN:
        return (results as number[][]).flat();
    }

    throw new BadRequestException(`Unknown job name ${job.name}`);
  }
}
