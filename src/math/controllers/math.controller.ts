import { Body, Controller, Post, Get, Param, BadRequestException } from '@nestjs/common';
import { Queue } from 'bullmq';
import { InjectMathBinaryQueue, InjectMathUnaryQueue } from '../decorators/inject-queue.decorator';
import { BinaryOperationDto } from '../dtos/binary-operation.dto';
import { UnaryOperationDto } from '../dtos/unary-operation.dto';
import { MATH_BINARY_OPS } from '../enums/math-binary-ops.enum';
import { MATH_UNARY_OPS } from '../enums/math-unary-ops.enum';

@Controller('math')
export class MathController {
  constructor(
    @InjectMathBinaryQueue() private mathBinaryQueue: Queue,
    @InjectMathUnaryQueue() private mathUnaryQueue: Queue,
  ) {}

  @Post('sum')
  async sum(@Body() dto: BinaryOperationDto): Promise<string> {
    const job = await this.mathBinaryQueue.add(MATH_BINARY_OPS.SUM, dto);
    return job.id || '';
  }

  @Post('subtract')
  async subtract(@Body() dto: BinaryOperationDto): Promise<string | undefined> {
    const job = await this.mathBinaryQueue.add(MATH_BINARY_OPS.SUBTRACT, dto);
    return job.id || '';
  }

  @Post('multiply')
  async multiply(@Body() dto: BinaryOperationDto): Promise<string | undefined> {
    const job = await this.mathBinaryQueue.add(MATH_BINARY_OPS.MULTIPLY, dto);
    return job.id || '';
  }

  @Post('division')
  async division(@Body() dto: BinaryOperationDto): Promise<string | undefined> {
    const job = await this.mathBinaryQueue.add(MATH_BINARY_OPS.DIVISION, dto);
    return job.id || '';
  }

  @Post('square')
  async square(@Body() dto: UnaryOperationDto): Promise<string | undefined> {
    const job = await this.mathUnaryQueue.add(MATH_UNARY_OPS.SQUARE, dto);
    return job.id || '';
  }

  @Post('cube')
  async cube(@Body() dto: UnaryOperationDto): Promise<string | undefined> {
    const job = await this.mathUnaryQueue.add(MATH_UNARY_OPS.CUBE, dto);
    return job.id;
  }

  @Post('negate')
  async negate(@Body() dto: UnaryOperationDto): Promise<string | undefined> {
    const job = await this.mathUnaryQueue.add(MATH_UNARY_OPS.NEGATE, dto);
    return job.id || '';
  }

  @Get('binary/:id/result')
  async getBinaryJobResult(@Param('id') jobId: string): Promise<any> {
    const binaryJob = await this.mathBinaryQueue.getJob(jobId);
    if (binaryJob) {
      return binaryJob.returnvalue;
    }

    throw new BadRequestException(`Binary job id: ${jobId} is not found`);
  }

  @Get('unary/:id/result')
  async getUnaryJobResult(@Param('id') jobId: string): Promise<any> {
    const unaryJob = await this.mathUnaryQueue.getJob(jobId);
    if (unaryJob) {
      return unaryJob.returnvalue;
    }

    throw new BadRequestException(`Unary job id: ${jobId} is not found`);
  }
}
