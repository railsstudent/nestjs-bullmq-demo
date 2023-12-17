import { BullModule } from '@nestjs/bullmq';
import {
  MATH_BINARY,
  MATH_UNARY,
  MATH_COMPARISON_PRODUCER,
  MATH_COMPARISON_CHILD,
  MATH_COMPARISON_MERGE,
} from './constants/math.constant';

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
