import { Processor } from '@nestjs/bullmq';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Job } from 'bullmq';
import { MATH_COMPARISON_MERGE } from '../constants/math-comparison-flow.constant';
import { ComparisonOperationDto } from '../dtos/comparison-operation.dto';
import { MATH_COMPARISON_OPS } from '../enums/math-comparison-ops.enum';
import { WorkerHostProcessor } from './worker-host.processor';

@Processor(MATH_COMPARISON_MERGE)
@Injectable()
export class MathComparisonMergeProcessor extends WorkerHostProcessor {
  async process(job: Job<ComparisonOperationDto, number, string>): Promise<number> {
    const results = Object.values(await job.getChildrenValues());
    switch (job.name) {
      case MATH_COMPARISON_OPS.MIN:
        return Math.min(...results);
      case MATH_COMPARISON_OPS.MAX:
        return Math.max(...results);
    }

    throw new BadRequestException(`Unknown job name ${job.name}`);
  }
}
