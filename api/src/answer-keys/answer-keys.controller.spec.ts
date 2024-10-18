import { Test, TestingModule } from '@nestjs/testing'
import { AnswerKeysController } from './answer-keys.controller'
import { AnswerKeysService } from './answer-keys.service'

describe('AnswerKeysController', () => {
  let controller: AnswerKeysController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnswerKeysController],
      providers: [AnswerKeysService],
    }).compile()

    controller = module.get<AnswerKeysController>(AnswerKeysController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
