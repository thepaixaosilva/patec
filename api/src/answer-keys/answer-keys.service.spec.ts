import { Test, TestingModule } from '@nestjs/testing';
import { AnswerKeysService } from './answer-keys.service';

describe('AnswerKeysService', () => {
  let service: AnswerKeysService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnswerKeysService],
    }).compile();

    service = module.get<AnswerKeysService>(AnswerKeysService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
