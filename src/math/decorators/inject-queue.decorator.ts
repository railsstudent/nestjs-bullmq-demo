import { InjectQueue } from '@nestjs/bullmq';
import { MATH_ARRAY_MERGE } from '../constants/math-array.constant';
import { MATH_BINARY, MATH_UNARY } from '../constants/math.constant';

export const InjectMathBinaryQueue = () => InjectQueue(MATH_BINARY);
export const InjectMathUnaryQueue = () => InjectQueue(MATH_UNARY);
export const InjectMathArrayMergeQueue = () => InjectQueue(MATH_ARRAY_MERGE);
