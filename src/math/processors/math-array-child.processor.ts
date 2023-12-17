import { Processor } from '@nestjs/bullmq';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Job } from 'bullmq';
import { MATH_ARRAY_CHILD } from '../constants/math-array.constant';
import { MATH_ARRAY_OPS } from '../enums/math-array-ops.enum';
import { ComparisonJobProgress } from '../interfaces/job-progress.interface';
import { WorkerHostProcessor } from './worker-host.processor';

@Processor(MATH_ARRAY_CHILD)
@Injectable()
export class MathArrayChildProcessor extends WorkerHostProcessor {
  async process(job: Job<ComparisonJobProgress, number | number[], string>): Promise<number | number[]> {
    switch (job.name) {
      case MATH_ARRAY_OPS.MIN:
        const minResult = Math.min(...job.data.data);
        job.updateProgress(job.data.percentage);
        return minResult;
      case MATH_ARRAY_OPS.MAX:
        const maxResult = Math.max(...job.data.data);
        job.updateProgress(job.data.percentage);
        return maxResult;
      case MATH_ARRAY_OPS.FILTER_ODD:
        const oddArray = job.data.data.filter((n) => n % 2 === 1);
        job.updateProgress(job.data.percentage);
        return oddArray;
      case MATH_ARRAY_OPS.FILTER_EVEN:
        const evenArray = job.data.data.filter((n) => n % 2 === 0);
        job.updateProgress(job.data.percentage);
        return evenArray;
    }

    throw new BadRequestException(`Unknown job name ${job.name} found in queue ${job.queueName}`);
  }
}
