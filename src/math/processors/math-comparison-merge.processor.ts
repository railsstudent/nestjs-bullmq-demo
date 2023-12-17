import { Processor } from '@nestjs/bullmq';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Job } from 'bullmq';
import { MATH_ARRAY_MERGE } from '../constants/math-array.constant';
import { ComparisonOperationDto } from '../dtos/comparison-operation.dto';
import { MATH_ARRAY_OPS } from '../enums/math-array-ops.enum';
import { WorkerHostProcessor } from './worker-host.processor';

@Processor(MATH_ARRAY_MERGE)
@Injectable()
export class MathComparisonMergeProcessor extends WorkerHostProcessor {
  async process(job: Job<ComparisonOperationDto, number, string>): Promise<number> {
    const results = Object.values(await job.getChildrenValues());
    switch (job.name) {
      case MATH_ARRAY_OPS.MIN:
        return Math.min(...results);
      case MATH_ARRAY_OPS.MAX:
        return Math.max(...results);
    }

    throw new BadRequestException(`Unknown job name ${job.name}`);
  }
}
