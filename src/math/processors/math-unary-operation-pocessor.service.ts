import { Processor } from '@nestjs/bullmq';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Job } from 'bullmq';
import { MATH_UNARY } from '../constants/math.constant';
import { UnaryOperationDto } from '../dtos/unary-operation.dto';
import { MATH_UNARY_OPS } from '../enums/math-unary-ops.enum';
import { WorkerHostProcessor } from './worker-host.processor';

@Processor(MATH_UNARY)
@Injectable()
export class MathUnaryOperationPocessor extends WorkerHostProcessor {
  process(job: Job<UnaryOperationDto, number, string>): Promise<number> {
    switch (job.name) {
      case MATH_UNARY_OPS.CUBE:
        return Promise.resolve(Math.pow(job.data.num, 3));
      case MATH_UNARY_OPS.SQUARE:
        return Promise.resolve(Math.pow(job.data.num, 2));
      case MATH_UNARY_OPS.NEGATE:
        return Promise.resolve(0 - job.data.num);
    }

    throw new BadRequestException(`Unknown job name: ${job.name}`);
  }
}
