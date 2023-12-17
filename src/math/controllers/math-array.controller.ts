import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Queue } from 'bullmq';
import { InjectMathArrayMergeQueue } from '../decorators/inject-queue.decorator';
import { ArrayOperationDto } from '../dtos/array-operation.dto';
import { MATH_ARRAY_OPS } from '../enums/math-array-ops.enum';
import { ArrayFlowService } from '../services/array-flow.service';

@Controller('math-array')
export class MathArrayController {
  constructor(
    private arrayFlowService: ArrayFlowService,
    @InjectMathArrayMergeQueue() private mergeQueue: Queue,
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

  @Post('filter-odd')
  async filterOdd(@Body() dto: ArrayOperationDto): Promise<string> {
    return this.arrayFlowService.createFlow(dto, MATH_ARRAY_OPS.FILTER_ODD);
  }

  @Post('filter-even')
  async filterEven(@Body() dto: ArrayOperationDto): Promise<string> {
    return this.arrayFlowService.createFlow(dto, MATH_ARRAY_OPS.FILTER_EVEN);
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
