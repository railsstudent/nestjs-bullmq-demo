import { Processor } from '@nestjs/bullmq';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Job } from 'bullmq';
import { MATH_COMPARISON_CHILD } from '../constants/math-comparison-flow.constant';
import { MATH_COMPARISON_OPS } from '../enums/math-comparison-ops.enum';
import { ComparisonJobProgress } from '../interfaces/job-progress.interface';
import { WorkerHostProcessor } from './worker-host.processor';

@Processor(MATH_COMPARISON_CHILD)
@Injectable()
export class MathComparisonChildProcessor extends WorkerHostProcessor {
  async process(job: Job<ComparisonJobProgress, number, string>): Promise<number> {
    switch (job.name) {
      case MATH_COMPARISON_OPS.MIN:
        const minResult = Math.min(...job.data.data);
        job.updateProgress(job.data.percentage);
        return minResult;
      case MATH_COMPARISON_OPS.MAX:
        const maxResult = Math.max(...job.data.data);
        job.updateProgress(job.data.percentage);
        return maxResult;
    }

    throw new BadRequestException(`Unknown job name ${job.name} found in queue ${job.queueName}`);
  }
}
