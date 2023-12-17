import { InjectFlowProducer } from '@nestjs/bullmq';
import { MATH_ARRAY_PRODUCER } from '../constants/math-array.constant';

export function InjectMathComparisonProducer() {
  return InjectFlowProducer(MATH_ARRAY_PRODUCER);
}
