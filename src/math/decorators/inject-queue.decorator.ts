import { InjectQueue } from '@nestjs/bullmq';
import { MATH_BINARY, MATH_UNARY } from '../constants/math.constant';

export const InjectMathBinaryQueue = () => InjectQueue(MATH_BINARY);
export const InjectMathUnaryQueue = () => InjectQueue(MATH_UNARY);
