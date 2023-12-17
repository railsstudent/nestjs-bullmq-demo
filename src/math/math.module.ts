import { Module } from '@nestjs/common';
import { QueueModule } from '../queue-board/queue-board.module';
import { MATH_ARRAY_CHILD, MATH_ARRAY_MERGE, MATH_ARRAY_PRODUCER } from './constants/math-array.constant';
import { MATH_BINARY, MATH_UNARY } from './constants/math.constant';
import { MathArrayController } from './controllers/math-array.controller';
import { MathController } from './controllers/math.controller';
import { MathBinaryOperationProcessor } from './processors/math-binary-operation.processor';
import { MathArrayChildProcessor } from './processors/math-array-child.processor';
import { MathArrayMergeProcessor } from './processors/math-array-merge.processor';
import { MathUnaryOperationPocessor } from './processors/math-unary-operation-pocessor.service';
import { ArrayFlowService } from './services/array-flow.service';

@Module({
  imports: [
    QueueModule.register({
      queues: [MATH_BINARY, MATH_UNARY, MATH_ARRAY_CHILD, MATH_ARRAY_MERGE],
      flows: [MATH_ARRAY_PRODUCER],
    }),
  ],
  providers: [
    MathBinaryOperationProcessor,
    MathUnaryOperationPocessor,
    MathArrayChildProcessor,
    MathArrayMergeProcessor,
    ArrayFlowService,
  ],
  controllers: [MathController, MathArrayController],
})
export class MathModule {}
