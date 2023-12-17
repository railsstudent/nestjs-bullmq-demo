import { Test, TestingModule } from '@nestjs/testing';
import { MathController } from './math.controller';

describe('MathController', () => {
  let controller: MathController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MathController],
    }).compile();

    controller = module.get<MathController>(MathController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
