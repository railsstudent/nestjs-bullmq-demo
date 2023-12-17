import { Body, Controller, Post } from '@nestjs/common';
import { FlowProducer } from 'bullmq';
import { MATH_COMPARISON_CHILD, MATH_COMPARISON_MERGE } from '../constants/math.constant';
import { InjectMathComparisonProducer } from '../decorators/inject-flow-producer.decorator';
import { ComparisonOperationDto } from '../dtos/comparison-operation.dto';
import { MATH_COMPARISON_OPS } from '../enums/math-comparison-ops.enum';

@Controller('math-comparsion')
export class MathComparsionController {
  constructor(@InjectMathComparisonProducer() private mathComparisonFlowProducer: FlowProducer) {}

  @Post('min')
  async findMin(@Body() dto: ComparisonOperationDto): Promise<string> {
    const flow = await this.mathComparisonFlowProducer.add({
      name: 'min-in-array',
      queueName: MATH_COMPARISON_MERGE,
      children: [
        {
          name: MATH_COMPARISON_OPS.MIN,
          data: dto,
          queueName: MATH_COMPARISON_CHILD,
        },
      ],
    });
    return flow.job.id || '';
  }

  @Post('max`')
  async findMax(@Body() dto: ComparisonOperationDto): Promise<string> {
    const flow = await this.mathComparisonFlowProducer.add({
      name: 'max-in-array',
      queueName: MATH_COMPARISON_MERGE,
      children: [
        {
          name: MATH_COMPARISON_OPS.MAX,
          data: dto,
          queueName: MATH_COMPARISON_CHILD,
        },
      ],
    });
    return flow.job.id || '';
  }
}
