import { InjectFlowProducer } from '@nestjs/bullmq';
import { MATH_ARRAY_PRODUCER } from '../constants/math-array.constant';

export const InjectMathArrayProducer = () => InjectFlowProducer(MATH_ARRAY_PRODUCER);
