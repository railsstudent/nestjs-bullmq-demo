import { Injectable } from '@nestjs/common';
import { FlowChildJob, FlowProducer } from 'bullmq';
import { MATH_COMPARISON_CHILD, MATH_COMPARISON_MERGE } from '../constants/math-comparison-flow.constant';
import { InjectMathComparisonProducer } from '../decorators/inject-flow-producer.decorator';
import { ComparisonOperationDto } from '../dtos/comparison-operation.dto';
import { MATH_COMPARISON_OPS } from '../enums/math-comparison-ops.enum';

const PARTITION_SIZE = 4;

@Injectable()
export class ComparisonFlowService {
  constructor(@InjectMathComparisonProducer() private mathComparisonFlowProducer: FlowProducer) {}

  async createFlow(dto: ComparisonOperationDto, jobName: MATH_COMPARISON_OPS): Promise<string> {
    const children = this.createChildJobs(dto, jobName);

    const flow = await this.mathComparisonFlowProducer.add({
      name: jobName,
      queueName: MATH_COMPARISON_MERGE,
      children,
      opts: {
        failParentOnFailure: true,
      },
    });
    return flow.job.id || '';
  }

  async createMinMaxBulkFlow(dto: ComparisonOperationDto): Promise<string[]> {
    const minChildren = this.createChildJobs(dto, MATH_COMPARISON_OPS.MIN);
    const maxChildren = this.createChildJobs(dto, MATH_COMPARISON_OPS.MAX);

    const flows = await this.mathComparisonFlowProducer.addBulk([
      {
        name: MATH_COMPARISON_OPS.MIN,
        queueName: MATH_COMPARISON_MERGE,
        children: minChildren,
        opts: {
          failParentOnFailure: true,
        },
      },
      {
        name: MATH_COMPARISON_OPS.MAX,
        queueName: MATH_COMPARISON_MERGE,
        children: maxChildren,
        opts: {
          failParentOnFailure: true,
        },
      },
    ]);

    return flows.map((flow) => flow.job.id || '');
  }

  private createChildJobs(dto: ComparisonOperationDto, jobName: MATH_COMPARISON_OPS) {
    const numPartitions = Math.ceil(dto.data.length / PARTITION_SIZE);
    let startIdx = 0;

    const children: FlowChildJob[] = [];
    for (let i = 0; i < numPartitions - 1; i++) {
      children.push({
        name: jobName,
        data: {
          data: dto.data.slice(startIdx, startIdx + PARTITION_SIZE),
          percentage: (100 / numPartitions) * (i + 1),
        },
        queueName: MATH_COMPARISON_CHILD,
      });
      startIdx = startIdx + PARTITION_SIZE;
    }

    children.push({
      name: jobName,
      data: { data: dto.data.slice(startIdx), percentage: 100 },
      queueName: MATH_COMPARISON_CHILD,
    });

    return children;
  }
}
