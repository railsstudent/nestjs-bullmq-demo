import { InjectFlowProducer } from '@nestjs/bullmq';
import { MATH_COMPARISON_PRODUCER } from '../constants/math-comparison-flow.constant';

export function InjectMathComparisonProducer() {
  return InjectFlowProducer(MATH_COMPARISON_PRODUCER);
}
