import { InjectQueue } from '@nestjs/bullmq';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Queue } from 'bullmq';
import { MATH_ARRAY_MERGE } from '../constants/math-array.constant';
import { ComparisonOperationDto } from '../dtos/comparison-operation.dto';
import { MATH_ARRAY_OPS } from '../enums/math-array-ops.enum';
import { ComparisonFlowService } from '../services/comparison-flow.service';

@Controller('math-comparison')
export class MathComparisonController {
  constructor(
    private comparisonFlowService: ComparisonFlowService,
    @InjectQueue(MATH_ARRAY_MERGE) private mergeQueue: Queue,
  ) {}

  @Post('min')
  async findMin(@Body() dto: ComparisonOperationDto): Promise<string> {
    return this.comparisonFlowService.createFlow(dto, MATH_ARRAY_OPS.MIN);
  }

  @Post('max')
  async findMax(@Body() dto: ComparisonOperationDto): Promise<string> {
    return this.comparisonFlowService.createFlow(dto, MATH_ARRAY_OPS.MAX);
  }

  @Post('min-max')
  async findMinMax(@Body() dto: ComparisonOperationDto): Promise<string[]> {
    return this.comparisonFlowService.createMinMaxBulkFlow(dto);
  }

  @Get(':id/result')
  async getResult(@Param('id') jobId: string): Promise<any> {
    const job = await this.mergeQueue.getJob(jobId);
    if (job) {
      return job.returnvalue;
    }

    return null;
  }
}
