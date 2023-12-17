import { BullModule } from '@nestjs/bullmq';
import { MATH_BINARY, MATH_UNARY } from './constants/math.constant';
import {
  MATH_COMPARISON_CHILD,
  MATH_COMPARISON_MERGE,
  MATH_COMPARISON_PRODUCER,
} from './constants/math-comparison-flow.constant';

export const REGISTERED_BULLMQS = [
  BullModule.registerQueue({
    name: MATH_BINARY,
  }),
  BullModule.registerQueue({
    name: MATH_UNARY,
  }),
  BullModule.registerQueue({
    name: MATH_COMPARISON_CHILD,
  }),
  BullModule.registerQueue({
    name: MATH_COMPARISON_MERGE,
  }),
];

export const REGISTERED_FLOW_PRODUCERS = [
  BullModule.registerFlowProducer({
    name: MATH_COMPARISON_PRODUCER,
  }),
];
