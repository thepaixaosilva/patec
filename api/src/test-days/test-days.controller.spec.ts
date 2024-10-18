import { Test, TestingModule } from '@nestjs/testing';
import { TestDaysController } from './test-days.controller';
import { TestDaysService } from './test-days.service';

describe('TestDaysController', () => {
  let controller: TestDaysController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TestDaysController],
      providers: [TestDaysService],
    }).compile();

    controller = module.get<TestDaysController>(TestDaysController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
