import { InjectQueue } from '@nestjs/bullmq';
import { MATH_BINARY, MATH_UNARY } from '../constants/math.constant';

export function InjectMathBinaryQueue() {
  return InjectQueue(MATH_BINARY);
}

export function InjectMathUnaryQueue() {
  return InjectQueue(MATH_UNARY);
}
