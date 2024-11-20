import { Test, TestingModule } from '@nestjs/testing'
import { StudentAnswersController } from './student-answers.controller'
import { StudentAnswersService } from './student-answers.service'

describe('StudentAnswersController', () => {
  let controller: StudentAnswersController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudentAnswersController],
      providers: [StudentAnswersService],
    }).compile()

    controller = module.get<StudentAnswersController>(StudentAnswersController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
