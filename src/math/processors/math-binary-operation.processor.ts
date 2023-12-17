import { Processor } from '@nestjs/bullmq';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Job } from 'bullmq';
import { MATH_BINARY } from '../constants/math.constant';
import { BinaryOperationDto } from '../dtos/binary-operation.dto';
import { MATH_BINARY_OPS } from '../enums/math-binary-ops.enum';
import { WorkerHostProcessor } from './worker-host.processor';

@Processor(MATH_BINARY)
@Injectable()
export class MathBinaryOperationProcessor extends WorkerHostProcessor {
  process(job: Job<BinaryOperationDto, number, string>): Promise<number> {
    const { num, num2 } = job.data;
    switch (job.name) {
      case MATH_BINARY_OPS.SUM:
        return Promise.resolve(num + num2);
      case MATH_BINARY_OPS.SUBTRACT:
        return Promise.resolve(num - num2);
      case MATH_BINARY_OPS.MULTIPLY:
        return Promise.resolve(num * num2);
      case MATH_BINARY_OPS.DIVISION:
        if (num2 === 0) {
          throw new BadRequestException('Division by zero error');
        }
        return Promise.resolve(num / num2);
    }
    throw new BadRequestException(`Unknown job name: ${job.name}`);
  }
}
