import { InjectQueue } from '@nestjs/bullmq';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Queue } from 'bullmq';
import { MATH_ARRAY_MERGE } from '../constants/math-array.constant';
import { ArrayOperationDto } from '../dtos/array-operation.dto';
import { MATH_ARRAY_OPS } from '../enums/math-array-ops.enum';
import { ArrayFlowService } from '../services/array-flow.service';

@Controller('math-array')
export class MathArrayController {
  constructor(
    private arrayFlowService: ArrayFlowService,
    @InjectQueue(MATH_ARRAY_MERGE) private mergeQueue: Queue,
  ) {}

  @Post('min')
  async findMin(@Body() dto: ArrayOperationDto): Promise<string> {
    return this.arrayFlowService.createFlow(dto, MATH_ARRAY_OPS.MIN);
  }

  @Post('max')
  async findMax(@Body() dto: ArrayOperationDto): Promise<string> {
    return this.arrayFlowService.createFlow(dto, MATH_ARRAY_OPS.MAX);
  }

  @Post('min-max')
  async findMinMax(@Body() dto: ArrayOperationDto): Promise<string[]> {
    return this.arrayFlowService.createMinMaxBulkFlow(dto);
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