import { Test, TestingModule } from '@nestjs/testing';
import { TestDaysService } from './test-days.service';

describe('TestDaysService', () => {
  let service: TestDaysService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TestDaysService],
    }).compile();

    service = module.get<TestDaysService>(TestDaysService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
