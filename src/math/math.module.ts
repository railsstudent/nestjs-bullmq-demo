import { Module } from '@nestjs/common';
import { QueueModule } from '../queue-board/queue-board.module';
import {
  MATH_COMPARISON_CHILD,
  MATH_COMPARISON_MERGE,
  MATH_COMPARISON_PRODUCER,
} from './constants/math-comparison-flow.constant';
import { MATH_BINARY, MATH_UNARY } from './constants/math.constant';
import { MathComparisonController } from './controllers/math-comparison.controller';
import { MathController } from './controllers/math.controller';
import { MathBinaryOperationProcessor } from './processors/math-binary-operation.processor';
import { MathComparisonChildProcessor } from './processors/math-comparison-child.processor';
import { MathComparisonMergeProcessor } from './processors/math-comparison-merge.processor';
import { MathUnaryOperationPocessor } from './processors/math-unary-operation-pocessor.service';
import { ComparisonFlowService } from './services/comparison-flow.service';

@Module({
  imports: [
    QueueModule.register({
      queues: [MATH_BINARY, MATH_UNARY, MATH_COMPARISON_CHILD, MATH_COMPARISON_MERGE],
      flows: [MATH_COMPARISON_PRODUCER],
    }),
  ],
  providers: [
    MathBinaryOperationProcessor,
    MathUnaryOperationPocessor,
    MathComparisonChildProcessor,
    MathComparisonMergeProcessor,
    ComparisonFlowService,
  ],
  controllers: [MathController, MathComparisonController],
})
export class MathModule {}
